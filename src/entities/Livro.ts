import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("livros")
export class Livro {
    @PrimaryGeneratedColumn()
    id!: number; // <-- Adicionar '!'

    @Column({ length: 255 })
    titulo!: string; // <-- Adicionar '!'

    @Column({ length: 150 })
    autor!: string; // <-- Adicionar '!'

    @Column({ unique: true, length: 20 })
    isbn!: string; // <-- Adicionar '!'

    @Column({ type: "int" })
    anoPublicacao!: number; // <-- Adicionar '!'

    @Column({ default: true })
    disponivel!: boolean; // <-- Adicionar '!'
}