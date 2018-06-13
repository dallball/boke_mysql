/*
Navicat MySQL Data Transfer

Source Server         : local_centos
Source Server Version : 50556
Source Host           : 192.168.0.166:3306
Source Database       : bokhak

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2018-06-13 18:28:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author` (`author`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`author`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `blog_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES ('1', 'title1-update', '发射点发生发生123fsdf发射点发生发生123fsdf发射点发生发生123fsdf发射点发生发生123fsdf发射点发生发生123fsdf发射点发生发生123fsdf发射点发生发生123fsdf-update', '3', null, '2018-06-12 15:02:00', '2018-06-12 16:23:58');
INSERT INTO `blog` VALUES ('2', 'title23', 'asdfasdfasdfasdfasdfasdfasdf', '3', null, '2018-06-12 15:26:13', '2018-06-12 15:26:13');
INSERT INTO `blog` VALUES ('4', 'test3-update', 'asfadfasdfasdf-update', '3', null, '2018-06-12 16:25:58', '2018-06-12 16:26:22');
INSERT INTO `blog` VALUES ('5', 'test4', '123123sdfasdff', '3', null, '2018-06-13 10:51:44', '2018-06-13 10:51:44');
INSERT INTO `blog` VALUES ('6', 'test5-update', 'test5暗灰色的test5暗灰色的test5暗灰色的test5暗灰色的test5暗灰色的test5暗灰色的test5暗灰色的', '3', '2', '2018-06-13 11:21:34', '2018-06-13 11:30:34');
INSERT INTO `blog` VALUES ('7', 'test6', '华硕敦化市更多华硕敦化市东方', '2', '1', '2018-06-13 11:32:44', '2018-06-13 11:32:44');
INSERT INTO `blog` VALUES ('8', 'test8', '压缩敦化市华硕敦化市东方', '3', '1', '2018-06-13 11:45:49', '2018-06-13 11:45:49');
INSERT INTO `blog` VALUES ('9', 'test9', '阿快打锁定华硕东方', '2', '2', '2018-06-13 11:46:37', '2018-06-13 11:46:37');
INSERT INTO `blog` VALUES ('10', 'test10', '阿苏火山华硕东方的沙化', '2', '3', '2018-06-13 11:46:54', '2018-06-13 11:46:54');
INSERT INTO `blog` VALUES ('11', 'test11', '罂粟花沙化价格打算加多少华硕东方', '2', '1', '2018-06-13 11:47:04', '2018-06-13 11:47:04');
INSERT INTO `blog` VALUES ('12', 'test12', 'afasdfasdfasfasdf', '2', '1', '2018-06-13 18:06:07', '2018-06-13 18:06:07');
INSERT INTO `blog` VALUES ('13', 'test13', 'asfasdfasfasdf', '2', '1', '2018-06-13 18:07:34', '2018-06-13 18:07:34');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '分类1', '2018-06-13 11:21:34', '2018-06-13 11:21:34');
INSERT INTO `category` VALUES ('2', '分类2', '2018-06-13 11:30:34', '2018-06-13 11:30:34');
INSERT INTO `category` VALUES ('3', '分类3', '2018-06-13 11:46:54', '2018-06-13 11:46:54');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) DEFAULT '20',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2', 'test', '4297f44b13955235245b2497399d7a93', '20', '2018-06-08 15:11:46', '2018-06-08 15:11:46');
INSERT INTO `user` VALUES ('3', 'test1', '4297f44b13955235245b2497399d7a93', '20', '2018-06-11 15:04:45', '2018-06-11 15:04:45');
