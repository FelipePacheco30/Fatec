select * from tbcurso

--EX1
select c.nome as "Curso"
from tbcurso as c, tbunidade as u, tbcurso_por_unidade as cpu
where u.id = cpu.idunidade and c.id = cpu.idcurso and municipio = 'Jacareí'
order by "Curso" asc;

--EX2
select c.nome as "Curso", t.nome as "Turno"
from tbcurso as c, tbturno as t, tbunidade as u, tbcurso_por_unidade as cpu
where u.id = cpu.idunidade and c.id = cpu.idcurso and t.id = cpu.idturno and municipio = 'Jacareí'
order by "Curso" asc, "Turno" asc;

--EX3
select distinct u.unidade as "Unidade"
from tbcurso as c, tbturno as t, tbunidade as u, tbcurso_por_unidade as cpu
where u.id = cpu.idunidade and c.id = cpu.idcurso and c.nome = 'Gestão Financeira'
order by "Unidade" asc;

--EX4
select distinct t.nome as "Turno"
from tbcurso as c, tbturno as t, tbunidade as u, tbcurso_por_unidade as cpu
where u.id = cpu.idunidade and c.id = cpu.idcurso and t.id = cpu.idturno and c.nome = 'Gestão Financeira' 
order by "Turno" asc;

--EX5
select t.nome as "Turno", Count(*) as "Quantidade"
from tbcurso as c, tbturno as t, tbunidade as u, tbcurso_por_unidade as cpu
where u.id = cpu.idunidade and c.id = cpu.idcurso and t.id = cpu.idturno
group by "Turno"
order by "Turno" asc, "Quantidade" asc;

--EX6
select t.nome as "Turno", sum(cpu.vaga) as "Quantidade"
from tbcurso as c, tbturno as t, tbunidade as u, tbcurso_por_unidade as cpu
where u.id = cpu.idunidade and c.id = cpu.idcurso and t.id = cpu.idturno
group by "Turno"
order by "Turno" asc, "Quantidade" asc;

--EX7
select u.unidade as "Unidade", t.nome as "Turno"
from tbcurso as c, tbturno as t, tbunidade as u, tbcurso_por_unidade as cpu
where u.id = cpu.idunidade and c.id = cpu.idcurso and t.id = cpu.idturno
group by "Unidade", "Turno"
order by "Unidade" asc, "Turno" asc;

--EX8
select u.unidade as "Unidade", t.nome as "Turno", count(*) as "Cursos"
from tbcurso as c, tbturno as t, tbunidade as u, tbcurso_por_unidade as cpu
where u.id = cpu.idunidade and c.id = cpu.idcurso and t.id = cpu.idturno
group by "Unidade", "Turno"
order by "Unidade" asc, "Turno" asc;

--EX9
select u.unidade as "Unidade", t.nome as "Turno", count(*) as "Cursos"
from tbcurso as c, tbturno as t, tbunidade as u, tbcurso_por_unidade as cpu
where u.id = cpu.idunidade and c.id = cpu.idcurso and t.id = cpu.idturno
group by "Unidade", "Turno"
having count(*) = 5
order by "Unidade" asc, "Turno" asc;

--EX10
select u.unidade as "Unidade", t.nome as "Turno", count(*) as "Cursos"
from tbcurso as c, tbturno as t, tbunidade as u, tbcurso_por_unidade as cpu
where u.id = cpu.idunidade and c.id = cpu.idcurso and t.id = cpu.idturno and t.nome = 'matutino'
group by "Unidade", "Turno"
having count(*) = 5
order by "Unidade" asc, "Turno" asc;

