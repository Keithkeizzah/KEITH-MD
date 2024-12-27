const axios = require('axios');
const apiKey = '4d3d074f107f44e09123d19ed6a89950';
const baseUrl = 'http://api.football-data.org/v4/';

module.exports = async (context) => {
    const { client, m, text } = context;

    if (!text) {
        return m.reply('🚩 Please specify an endpoint or query!

*Examples:*
competitions/PL/standings
- competitions/SA/scorers

Check API documentation for more queries: https://www.football-data.org/documentation/quickstart');
    }

    try {
        // Make the API request
        const response = await axios.get(`${baseUrl}${text}`, {
            headers: { 'X-Auth-Token': apiKey }
        });

        const data = response.data;
        const competitionCodes = ['WC', 'CL', 'BL1', 'DED', 'BSA', 'PD', 'FL1', 'ELC', 'PPL', 'EC', 'SA', 'PL', 'CLI'];

        // Handle standings data
        if (text.includes('standings')) {
            const competition = data.competition?.name || 'Unknown League';
            const standings = data.standings?.[0]?.table || [];
            
            if (standings.length === 0) {
                return m.reply(`⚠️ No standings data found.`);
            }

            const formattedStandings = standings.slice(0, 8).map((team) => {
                return `🏆 *Position ${team.position}: ${team.team.name}*
- Played: ${team.playedGames}
- Won: ${team.won}\n- Draw: ${team.draw}
- Lost: ${team.lost}
- Points: ${team.points}
- Goals For: ${team.goalsFor}
- Goals Against: ${team.goalsAgainst}
- Goal Difference: ${team.goalDifference}
`;
            }).join('\n');

            return m.reply(`📊 *${competition} Standings:*
${formattedStandings}`);
        }

        // Handle scorers data
        if (text.includes('scorers')) {
            const competition = data.competition?.name || 'Unknown League';
            const scorers = data.scorers || [];
            
            if (scorers.length === 0) {
                return m.reply(`⚠️ No scorers data found.`);
            }

            const formattedScorers = scorers.slice(0, 10).map((scorer, index) => {
                return `⚽ *${index + 1}. ${scorer.player.name} (${scorer.team.name})*
- Goals: ${scorer.goals}
- Assists: ${scorer.assists ?? 'N/A'}
- Penalties: ${scorer.penalties ?? 'N/A'}
`;
            }).join('\n');

            return m.reply(`📊 *Top Scorers in ${competition}:*
${formattedScorers}`);
        }

        // Handle matches data
        if (text.includes('matches')) {
            const { filters, resultSet, matches } = data;

            const filterInfo = `📅 *Filters:*
- Date From: ${filters?.dateFrom || 'N/A'}
- Date To: ${filters?.dateTo || 'N/A'}
- Permission: ${filters?.permission || 'N/A'}


`;

            const resultInfo = `📊 *Result Set:*
- Total Matches: ${resultSet?.count || 0}
- Competitions: ${resultSet?.competitions || 'N/A'}
- First Match: ${resultSet?.first || 'N/A'}
- Last Match: ${resultSet?.last || 'N/A'}
- Matches Played: ${resultSet?.played || 0}

`;

            const matchesInfo = matches.slice(0, 15).map((match) => {
                const { homeTeam, awayTeam, score, competition } = match;
                return `⚽ *${competition.name || 'Unknown League'}*
- Matchday: ${match.matchday || 'N/A'}
- Status: ${match.status || 'N/A'}
- ${homeTeam.name} (${score.fullTime.home ?? '-'} Goals) 🆚 ${awayTeam.name} (${score.fullTime.away ?? '-'} Goals)
- Winner: ${score.winner === 'HOME_TEAM' ? homeTeam.name : score.winner === 'AWAY_TEAM' ? awayTeam.name : 'Draw'}
`;
            }).join('\n');

            return m.reply(`${filterInfo}${resultInfo}${matchesInfo}`);
        }

        // Handle upcoming matches for known competitions
        const isCompetitionMatch = competitionCodes.some((code) => text.includes(`competitions/${code}/matches`));

        if (isCompetitionMatch) {
            const { filters, resultSet, competition, matches } = data;

            const today = new Date().toISOString().split('T')[0];
            const upcomingMatches = matches.filter((match) => match.utcDate >= today);

            const competitionInfo = `🏆 *Competition: ${competition.name || 'N/A'}*
- Type: ${competition.type || 'N/A'}
- Matches Played: ${resultSet?.played || 0}/${resultSet?.count || 0}
- Season: ${filters?.season || 'N/A'}

`;

            const matchDetails = upcomingMatches.slice(0, 15).map((match) => {
                const { homeTeam, awayTeam, utcDate, matchday } = match;
                return `📅 *Matchday ${matchday || 'N/A'}*
- Date: ${new Date(utcDate).toLocaleString()}
- ${homeTeam.name} 🆚 ${awayTeam.name}
`;
            }).join('\n');

            return m.reply(`${competitionInfo}${matchDetails}`);
        }

        // Fallback for other endpoints
        const fallbackOutput = Object.entries(data).slice(0, 15).map(([key, value]) => {
            return `- *${key}*: ${JSON.stringify(value, null, 2)}`;
        }).join('\n');

        return m.reply(`📊 *Data Summary:*
${fallbackOutput}`);

    } catch (e) {
        console.error(e);
        return m.reply(`❌ An error occurred while fetching data. Please check your query and try again.

*Examples:*
competitions/PL/standings
competitions/SA/scorers`);
    }
};
