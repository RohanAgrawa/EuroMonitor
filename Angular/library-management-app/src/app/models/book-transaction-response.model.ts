export class BookTransactionResponseModel{

    constructor(public borrowId : number, public bookId : number, public userId : number, public issueDate : Date, public returnDate : Date, public userName : string, public bookTitle : string, public userEmail : string){
    }
}