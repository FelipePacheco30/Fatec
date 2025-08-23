--Felipe Pacheco & Tiago 

--Criação das tabelas

create table if not exists cadastro (
id serial primary key,
nome varchar(200) not null,
email varchar(100)
);

create table if not exists eventos (
id serial primary key,
nome varchar(200) not null,
data_hora timestamp not null,
local varchar(100),
lotacao_max integer not null
);


create table if not exists inscricao (
id serial primary key,
id_cadastro integer references cadastro(id),
id_evento integer references eventos(id),	
status varchar (50) not null
);

--alimentação das tabelas


insert into cadastro (id, nome, email)
values
(1, 'Paulo Henrique', 'paulo_henrique@emai.com'),
(2, 'Ana Beatriz', 'ana_beatriz@email.com'),
(3, 'Carlos Eduardo', 'carlos_eduardo@email.com'),
(4, 'Juliana Silva', 'juliana_silva@email.com'),
(5, 'Rafael Gomes', 'rafael_gomes@email.com'),
(6, 'Mariana Oliveira', 'mariana_oliveira@email.com'),
(7, 'Lucas Martins', 'lucas_martins@email.com'),
(8, 'Fernanda Costa', 'fernanda_costa@email.com'),
(9, 'João Pedro', 'joao_pedro@email.com'),
(10, 'Camila Rocha', 'camila_rocha@email.com');


insert into eventos(id, nome, data_hora, local, lotacao_max)
values
(1, 'Workshop de Java', '2025-06-10 14:00:00', 'Auditório Principal', 10),
(2, 'Feira de Tecnologia', '2025-07-01 09:00:00', 'Centro de Convenções', 30),
(3, 'Palestra sobre IA', '2025-06-15 16:00:00', 'Sala 204', 50),
(4, 'Hackathon FATEC', '2025-08-05 08:00:00', 'Laboratório 3', 80),
(5, 'Encontro de Desenvolvedores', '2025-07-20 18:30:00', 'Sala de Reuniões B', 40),
(6, 'Oficina de Design UX', '2025-06-25 10:00:00', 'Laboratório de Informática', 60),
(7, 'Mesa-redonda sobre Carreiras', '2025-07-10 15:00:00', 'Auditório 2', 120),
(8, 'Apresentação de Projetos', '2025-06-30 13:00:00', 'Sala 101', 30),
(9, 'Mini-curso de Banco de Dados', '2025-07-05 14:30:00', 'Sala 305', 45),
(10, 'Semana Acadêmica ADS', '2025-08-12 09:00:00', 'Bloco A - Sala 1', 20);

-- insert com foreign key

insert into inscricao (id, id_cadastro, id_evento, status) values (1, (select id from cadastro where nome = 'Paulo Henrique'), (select id from eventos where nome = 'Workshop de Java'), 'Pendente');
insert into inscricao (id, id_cadastro, id_evento, status) values (2, (select id from cadastro where nome = 'Ana Beatriz'), (select id from eventos where nome = 'Feira de Tecnologia'), 'Cancelada');
insert into inscricao (id, id_cadastro, id_evento, status) values (3, (select id from cadastro where nome = 'Carlos Eduardo'), (select id from eventos where nome = 'Palestra sobre IA'), 'Confirmada');
insert into inscricao (id, id_cadastro, id_evento, status) values (4, (select id from cadastro where nome = 'Juliana Silva'), (select id from eventos where nome = 'Hackathon FATEC'), 'Pendente');
insert into inscricao (id, id_cadastro, id_evento, status) values (5, (select id from cadastro where nome = 'Rafael Gomes'), (select id from eventos where nome = 'Encontro de Desenvolvedores'), 'Cancelada');
insert into inscricao (id, id_cadastro, id_evento, status) values (6, (select id from cadastro where nome = 'Mariana Oliveira'), (select id from eventos where nome = 'Oficina de Design UX'), 'Confirmada');
insert into inscricao (id, id_cadastro, id_evento, status) values (7, (select id from cadastro where nome = 'Lucas Martins'), (select id from eventos where nome = 'Mesa-redonda sobre Carreiras'), 'Pendente');
insert into inscricao (id, id_cadastro, id_evento, status) values (8, (select id from cadastro where nome = 'Fernanda Costa'), (select id from eventos where nome = 'Apresentação de Projetos'), 'Cancelada');
insert into inscricao (id, id_cadastro, id_evento, status) values (9, (select id from cadastro where nome = 'João Pedro'), (select id from eventos where nome = 'Mini-curso de Banco de Dados'), 'Confirmada');
insert into inscricao (id, id_cadastro, id_evento, status) values (10, (select id from cadastro where nome = 'Camila Rocha'), (select id from eventos where nome = 'Semana Acadêmica ADS'), 'Pendente');
insert into inscricao (id, id_cadastro, id_evento, status) values (11, (select id from cadastro where nome = 'Paulo Henrique'), (select id from eventos where nome = 'Semana Acadêmica ADS'), 'Cancelada');
insert into inscricao (id, id_cadastro, id_evento, status) values (12, (select id from cadastro where nome = 'Ana Beatriz'), (select id from eventos where nome = 'Mini-curso de Banco de Dados'), 'Confirmada');
insert into inscricao (id, id_cadastro, id_evento, status) values (13, (select id from cadastro where nome = 'Carlos Eduardo'), (select id from eventos where nome = 'Apresentação de Projetos'), 'Pendente');
insert into inscricao (id, id_cadastro, id_evento, status) values (14, (select id from cadastro where nome = 'Juliana Silva'), (select id from eventos where nome = 'Mesa-redonda sobre Carreiras'), 'Cancelada');
insert into inscricao (id, id_cadastro, id_evento, status) values (15, (select id from cadastro where nome = 'Rafael Gomes'), (select id from eventos where nome = 'Oficina de Design UX'), 'Confirmada');
insert into inscricao (id, id_cadastro, id_evento, status) values (16, (select id from cadastro where nome = 'Mariana Oliveira'), (select id from eventos where nome = 'Encontro de Desenvolvedores'), 'Pendente');
insert into inscricao (id, id_cadastro, id_evento, status) values (17, (select id from cadastro where nome = 'Lucas Martins'), (select id from eventos where nome = 'Hackathon FATEC'), 'Cancelada');
insert into inscricao (id, id_cadastro, id_evento, status) values (18, (select id from cadastro where nome = 'Fernanda Costa'), (select id from eventos where nome = 'Palestra sobre IA'), 'Confirmada');
insert into inscricao (id, id_cadastro, id_evento, status) values (19, (select id from cadastro where nome = 'João Pedro'), (select id from eventos where nome = 'Feira de Tecnologia'), '');
insert into inscricao (id, id_cadastro, id_evento, status) values (20, (select id from cadastro where nome = 'Camila Rocha'), (select id from eventos where nome = 'Workshop de Java'), '');

-- Consultas 

-- Quais eventos um participante se inscreveu
select c.nome, e.nome from inscricao as i, eventos as e, cadastro as c
where i.id_evento = e.id
and i.id_cadastro = c.id
and i.id_cadastro = 6;

--Quais eventos estao com estado pendente
select e.nome, c.nome, i.status from inscricao as i, eventos as e, cadastro as c
where i.id_evento = e.id
and i.id_cadastro = c.id
and i.status = 'Pendente';

--Quais participantes se inscreveram em mais de um evento
select  c.nome, count(distinct i.id_evento) as qnt_evento from inscricao as i, eventos as e, cadastro as c
where i.id_cadastro = c.id
group by c.nome
having count(distinct i.id_evento) > 1
order by c.nome asc ;

--Quantas pessoas se inscreveram em cada evento
select e.nome, count(i.*) as "qntd_inscrições"
from inscricao as i, eventos as e
where i.id_evento = e.id 
group by e.nome;

--Quantos eventos cada participante se inscreveu
select  c.nome, count(distinct i.id_evento) as qnt_evento from inscricao as i, eventos as e, cadastro as c
where i.id_cadastro = c.id
group by c.nome
order by c.nome asc ;

--Quantas inscrições estão pendentes, confirmadas ou canceladas
select distinct i.status, count(*) from inscricao as i
group by i.status

--update status das inscrições de um determinado participante

update inscricao
set status = 'Cancelada'
where id = 20;

update inscricao
set status = 'Confirmada'
where id = 19;

--remover a inscrição de um determinado participante
delete from inscricao
where id = 13