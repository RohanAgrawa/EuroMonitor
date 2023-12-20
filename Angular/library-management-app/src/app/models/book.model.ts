export class BookModel{

    private title: string;
    private author: string;
    private description: string;
    private genre: string;
    private publicationYear: string;
    private isbn: string;
    private id: number;

    constructor(title: string, author: string, description: string, genre: string, publicationYear: string, isbn: string , id?: number){
        this.title = title.toUpperCase();
        this.author = author.toUpperCase();
        this.description = description.toUpperCase();
        this.genre = genre.toUpperCase();
        this.publicationYear = publicationYear;
        this.isbn = isbn;
        this.id = id;
    }
}