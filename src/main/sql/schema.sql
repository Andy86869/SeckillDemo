-- 数据库初始化脚本
--创建数据库
CREATE DATABASE seckill;
USE seckill;

-- todo:mysql　Ver　5.7.12for Linux(x86_64)中一个表只能有一个TIMESTAMP
CREATE TABLE seckill(
`seckill_id` BIGINT NOT NUll AUTO_INCREMENT COMMENT '商品库存ID',
`name` VARCHAR(120) NOT NULL COMMENT '商品名称',
`number` int NOT NULL COMMENT '库存数量',
`start_time` TIMESTAMP  NOT NULL COMMENT '秒杀开始时间',
`end_time`   DATETIME   NOT NULL COMMENT '秒杀结束时间',
`create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
PRIMARY KEY (seckill_id),
key idx_start_time(start_time),
key idx_end_time(end_time),
key idx_create_time(create_time)
)ENGINE=INNODB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='秒杀库存表';

-- 初始化数据

insert into 
	seckill(name,number,start_time,end_time)
values
	('1000元秒杀iPhone6s',100,'2016-9-19 00:00:00','2016-9-25 00:00:00'),
	('500元秒杀iPad4',200,'2016-9-23 00:00:00','2016-9-28 00:00:00'),
	('1000元秒杀魅族Pro6',300,'2016-9-19 00:00:00','2016-9-21 00:00:00'),
	('800元秒杀iPhone6',100,'2016-9-19 00:00:00','2016-9-21 00:00:00'),
	('200元秒杀魅族mx5',400,'2016-9-19 00:00:00','2016-9-21 00:00:00');

-- 秒杀成功明细表
-- 用户登录认证相关信息(简化为手机号)
CREATE TABLE success_killed(
`seckill_id` BIGINT NOT NULL COMMENT '秒杀商品ID',
`user_phone` BIGINT NOT NULL COMMENT '用户手机号',
`state` TINYINT NOT NULL DEFAULT -1 COMMENT '状态标识:-1:无效 0:成功 1:已付款 2:已发货',
`create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
PRIMARY KEY(seckill_id,user_phone),/*联合主键*/
KEY idx_create_time(create_time)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='秒杀成功明细表'


	