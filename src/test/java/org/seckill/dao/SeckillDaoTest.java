package org.seckill.dao;

import static org.junit.Assert.*;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.seckill.entity.Seckill;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
/**
 * 配置spring 和 junit 整合,为了是junit启动时加载spring IOC 容器
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
//告诉junit spring 配置文件
@ContextConfiguration({"classpath:spring/spring-dao.xml"})
public class SeckillDaoTest {
	
	//注入DAO实现类依赖
	@Resource
	private SeckillDao seckillDao;
	//
	@Test
	public void testQueryById() {
			long id = 1005;
			Seckill seckill = seckillDao.queryById(id);
			System.out.println(seckill.getName());
			System.out.println(seckill);
	}

	@Test
	public void testQueryAll() {
		List<Seckill> seckills = seckillDao.queryAll(0, 100);
		for(Seckill seckill:seckills){
			System.out.println(seckill);
		}
	}
	
	@Test
	public void testReduceNumber() {
		//Parameter 'seckillId' not found. Available parameters are [0, 1, param1, param2]
		//java 没有保存形参的记录 :reduceNumber(long seckillId,Date killTime) -> 默认是这样的 reduceNumber(arg0,arg1)  
		Date killTime = new Date();
		int updateCount = seckillDao.reduceNumber(1005L, killTime);
		System.out.println("updateCount:"+updateCount);
	}

	

}
