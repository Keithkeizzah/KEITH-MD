import { Link } from "./Link"; 

export class List <T> {
    first : Link<T>;
    last : Link<T>;
    private len : number;

    constructor(data? : T ){
        this.len = 0 ;
        if(data == undefined){
            this.first = this.last = null;
        }else{
            this.entryPoint(data);
        }
    }
    
    private entryPoint(data : T){
        this.last = this.first = new Link<T>(data);
        this.len++;
    }

    public isEmpty(): boolean{
        return ( ((this.first == null) && (this.last == null)) || (this.len <= 0));
    }

    public insertFirst(data : T) : number{
        if(this.isEmpty()){
         this.entryPoint(data);
        }else{
            let tmp : Link<T> = this.first;
            this.first = new Link<T>(data);
            this.first.next = tmp;
            tmp.previous = this.first;
            this.len++ ;
        }
        return 0 ;
    }

    public insertLast(data : T) : number{
        if(this.isEmpty) this.entryPoint(data);
        else{
            let tmp : Link<T> = this.last;
            this.last = new Link<T>(data);
            this.last.previous = tmp;
            tmp.next = this.last;
            this.len++ ;
        }
        return 0 ;
    }

    public removeFirst(): T{
        if(this.isEmpty()){
            return null ;
        }
        let tmp : Link<T> = this.first ;
        if(tmp.next == null){
            this.first = this.last = null
        }else{
            this.first = tmp.next;
        }
        this.len--;
        return tmp.data;
    }

    public removeLast() :T{
        if( (this.isEmpty())){
            return null ;
        }
        let tmp : Link<T> = this.last ;
        if(tmp.previous == null ){
            this.last = tmp.previous;
            this.last.next != null ? this.last.next = null : "" ;
        }else{
            this.first = this.last = null;
        }
        this.len--;
        return tmp.data;
    }

    public getFirst(){

        return this.first == null ? null : this.first.data ;
    }
    public getLast(){
        return this.last == null ? null : this.last.data
    }


    public length():number{
        return this.len ;
    }

    public display(){
        let tmp : Link<T> = this.first ;
        while(tmp != null){
            tmp.display();
            tmp = tmp.next;
        }
    }
    
}