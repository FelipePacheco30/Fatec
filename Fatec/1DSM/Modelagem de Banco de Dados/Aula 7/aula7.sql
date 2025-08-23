--EX1
SELECT unidade AS "Fatec", COUNT(*) AS "Quantidade"
FROM tbcurso
GROUP BY unidade
ORDER BY unidade ASC;

--EX2
SELECT unidade AS "Fatec", COUNT(*) AS "Quantidade"
FROM tbcurso
GROUP BY unidade
ORDER BY "Quantidade" DESC;

--EX3
SELECT unidade AS "Fatec", COUNT(*) AS "Quantidade"
FROM tbcurso
GROUP BY unidade
ORDER BY "Quantidade" DESC
LIMIT 1;

--EX4
SELECT unidade AS "Fatec", COUNT(*) AS "Quantidade"
FROM tbcurso
GROUP BY unidade
ORDER BY "Quantidade" DESC
LIMIT 1
OFFSET 1;

--EX5
SELECT unidade AS "Fatec", COUNT(*) AS "Quantidade"
FROM tbcurso
GROUP BY unidade
HAVING COUNT(*) = 3
ORDER BY unidade ASC;

--EX6
SELECT unidade AS "Fatec", turno AS "Turno", COUNT(*) AS "Quantidade"
FROM tbcurso
GROUP BY unidade, turno
ORDER BY unidade ASC;

--EX7
SELECT unidade AS "Fatec", turno AS "Turno", COUNT(*) AS "Quantidade"
FROM tbcurso
GROUP BY unidade, turno
HAVING COUNT(*) = 5
ORDER BY unidade ASC;

--EX8
SELECT unidade AS "Fatec", turno AS "Turno", COUNT(*) AS "Quantidade"
FROM tbcurso
WHERE municipio = 'São José dos Campos'
GROUP BY unidade, turno
ORDER BY unidade ASC;

--EX9
SELECT unidade AS "Fatec", turno AS "Turno", SUM(vaga) AS "Quantidade"
FROM tbcurso
WHERE municipio = 'São José dos Campos'
GROUP BY unidade, turno
ORDER BY unidade ASC;

--EX10
SELECT turno AS "Turno", SUM(vaga) AS "Quantidade"
FROM tbcurso
GROUP BY turno
ORDER BY turno ASC;
