package org.seckill.dao;


import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.seckill.entity.SuccessKilled;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({ "classpath:spring/spring-dao.xml" })
public class SuccessKilledDaoTest {
	
	@Resource
	private SuccessKilledDao successKilledDao;
	
	@Test
	public void testInsertSuccessKilled() {
		/**
		 * 第一次的秒杀 insertCount = 1;
		 * 第二次的秒杀 insertCount = 0;
		 */
		long id =1006;
		long phone = 18268251971L;
		int insertCount = successKilledDao.insertSuccessKilled(id, phone);
		System.out.println("insertCount:"+insertCount);
	}

	@Test
	public void testQueryByIdWithSeckill() {
		long id =1005;
		long phone = 18268251971L;
		SuccessKilled successKilled =  successKilledDao.queryByIdWithSeckill(id, phone);
		System.out.println(successKilled);
		System.out.println(successKilled.getSeckill());
	}

}
