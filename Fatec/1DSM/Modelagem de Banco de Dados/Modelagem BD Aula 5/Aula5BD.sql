--ex. 1

drop table if exists endereco;
drop table if exists bairro;
drop table if exists cidade;

--ex. 2
drop table if exists endereco;
drop table if exists bairro;
drop table if exists cidade;

create table if not exists cidade (
	idcidade integer primary key,
	nome varchar(40),
	uf char(2)
);
	
create table if not exists bairro (
	idbairro integer primary key,
	nome varchar(20),
	idcidade integer references cidade (idcidade)
);
	
create table if not exists endereco (
	idendereco integer primary key,
	logradouro varchar(30),
	numero integer,
	cep integer,
	idbairro integer references bairro(idbairro)
);
	
--ex. 3
drop table if exists tarefa;

create table if not exists tarefa (
	idtarefa integer primary key,
	nome varchar(30),
	valor float,
	idtarefapai integer references tarefa (idtarefa)
);
	
--ex. 4
drop table if exists ocupa;
drop table if exists vaga;
drop table if exists veiculo;
	
create table if not exists veiculo (
	placa char(7) primary key,
	marca varchar(20),
	modelo varchar(20)
);
	
create table if not exists vaga (
	nome varchar(10) primary key
);
	
create table if not exists ocupa (
	placa_veiculo char(7) references veiculo (placa),
	nome_vaga varchar(10) references vaga (nome),
	valor float, 
	inicio timestamp,
	fim timestamp
);		
	
--ex. 5
drop table if exists imovel;
drop table if exists pessoa;

create table if not exists pessoa (
	idpessoa integer primary key,
	nome varchar(40)
);
create table if not exists imovel (
	idimovel integer primary key,
	descricao varchar(50),
	idproprietario integer references pessoa (idpessoa),
	idinquilino integer references pessoa (idpessoa)
);