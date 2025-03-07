export  class Link <T>{
    data : T ;
    next : Link<T>;
    previous : Link<T>;
    constructor(data : T){
        this.data = data;
        this.next = this.previous = null ;
    }
    public  display(): void{
            console.log(this.data);
    }
}