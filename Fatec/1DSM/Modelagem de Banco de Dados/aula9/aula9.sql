--ex01
insert into tbaluno(id, nome)
values
(1, 'Ana Maria'),
(2, 'Luiz Carlos'),
(3, 'Maria Silva '),
(4, 'Renato Rodrigues'),
(5, 'Carla Santiago');
select * from tbaluno;

--ex02
insert into tbdisciplina(id, nome, carga)
values
(1, 'Modelagem de Banco de dados', 80),
(2, 'Design Digital', 80),
(3, 'Estrutura de Dados', NULL),
(4, 'Experiencia do usuario', 40),
(5, 'Aprendizagem de Máquina', NULL),
(6, 'Inglês', NULL);
select * from tbdisciplina;

--ex03

insert into tbmatricula
values
(3,1, 7.8),
(1,5, 8.4),
(1,2, 7.5),
(6,2, NULL),
(3,4, NULL),
(5,4, 8.9),
(6,4, NULL);

select * from tbmatricula;
select d.nome as "Disciplina", a.nome as "Aluno", m.nota as "Nota" from tbdisciplina as d, tbaluno as a, tbmatricula as m
where d.id = m.iddisciplina and a.id = m.idaluno;


--ex04
update tbmatricula as m 
set nota = nota + 0.5
where nota is not null;
select * from tbmatricula;

--ex05
update tbmatricula as m
set nota = nota + 0.2
from tbdisciplina as d
where d.id = m.iddisciplina and d.nome = 'Modelagem de Banco de dados' and m.nota is not null;

select d.nome as "Disciplina", a.nome as "Aluno", m.nota as "Nota" 
from tbdisciplina as d, tbaluno as a, tbmatricula as m
where d.id = m.iddisciplina and a.id = m.idaluno
order by "Aluno" asc;

--ex06
update tbmatricula as m
set nota = 5
from tbdisciplina as d, tbaluno as a
where d.id = m.iddisciplina and d.nome = 'Inglês' and a.nome = 'Luiz Carlos';

select d.nome as "Disciplina", a.nome as "Aluno", m.nota as "Nota" 
from tbdisciplina as d, tbaluno as a, tbmatricula as m
where d.id = m.iddisciplina and a.id = m.idaluno
order by "Aluno" asc;


--ex07
update tbmatricula as m
set nota = 0
where nota is null;

select d.nome as "Disciplina", a.nome as "Aluno", m.nota as "Nota" 
from tbdisciplina as d, tbaluno as a, tbmatricula as m
where d.id = m.iddisciplina and a.id = m.idaluno
order by "Aluno" asc;


--ex08
delete
from tbmatricula as m
where nota = 0;

select d.nome as "Disciplina", a.nome as "Aluno", m.nota as "Nota" 
from tbdisciplina as d, tbaluno as a, tbmatricula as m
where d.id = m.iddisciplina and a.id = m.idaluno
order by "Aluno" asc;

--ex09
delete from tbmatricula as m
using tbdisciplina as d, tbaluno as a
where a.id = m.idaluno and .id = m.iddisciplina and d.nome = 'Inglês' and a.nome = 'Luiz Carlos';

select d.nome as "Disciplina", a.nome as "Aluno", m.nota as "Nota" 
from tbdisciplina as d, tbaluno as a, tbmatricula as m
where d.id = m.iddisciplina and a.id = m.idaluno
order by "Aluno" asc;

--ex10
delete from tbmatricula;
