--ex 6
select * from tbfaculdade where bairro ilike '%vila%';

--ex 7
select * from tbfaculdade where cep like '%000';

--ex 8
select * from tbfaculdade where cep like '%_5';

--ex 9
select * from tbfaculdade where cep like '_5%2_';

--ex 10
select * from tbfaculdade where numero like '__';