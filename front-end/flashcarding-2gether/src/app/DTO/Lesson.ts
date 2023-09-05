import { Flashcard } from "./Flashcard"

export interface Lesson {
    id?: number,
    title: string,
    subject: string,
    creationDate: string,
    public: boolean,
    username: string,
    description: string,
    flashcards: Flashcard[]
}