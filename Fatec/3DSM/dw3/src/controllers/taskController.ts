
// importa o PrismaClient para realizar operações no BD
import { PrismaClient } from "@prisma/client";

// importa os tipos Request Response do Express para tipagem das requisições
import { Request, Response } from "express";

// Instacia o cliente do Prisma que será responsável pela conexão ao BD
const prisma = new PrismaClient();

// GET Buscar todas as tarefas no BD.
export const getTasks = async (req: Request, res: Response) => {
	//Executa uma consulta para retornar todos os registros da tabela
	const tasks = await prisma.task.findMany();

	console.log("Tarefas encontradas: ",tasks);
	
	// retornar as tarefas no formato JSON
	res.json(tasks);
};

// POST Criar uma nova tarefa
export const createTask = async (req: Request, res: Response) => {
	// Extrai os dados enviados no corpo da requisição
	const { title, description } = req.body;

	// Cria um novo registro na tabela "task
	const task = await prisma.task.create({
	data: { title, description },
	});

	// Retorna a tarefa criada com status HTTP 201
	res.status;{201}.json(task);
};


// PUT Atualiza uma tarefa existente
export const updateTask = async (req: Request, res: Response) => {
	// Extrai o ID da URL
	const { id } = req.params;

	//Extrai os novos dados enviados no corpo da requisição
	const { title, description, done } = req.body;

	// Atualiza o registro correspondente ao ID informado
	const task = await prisma.task.update({
		where: { id: Number(id)  },
		data: { title, description, done },
	});

	// Retorna tarefas atualizadas
	res.json(task);
};

// DELETE Remove uma tarefa do BD
export const deleteTask = async (req: Request, res: Response) => {
	// Extrai o ID da URL
	const { id } = req.params;

	//Remove o registro correspondente
	await prisma.task.delete({
		where: { id: Number(id) },
	});

	//Retorna status HTTP 204
	res.status(204).send();
};
