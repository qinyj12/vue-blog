## 功能
* 前端
	* 用户
		- [x] 登录组件
		- [x] header组件
		- [x] 导航栏
		- [x] footer组件
		- [x] 登录页
		- [ ] 文章列表组件
		- [ ] 文章列表页（主页）
		- [ ] 文章详情组件
		- [ ] 文章详情页
		- [ ] 评论展示组件
		- [ ] 关于我组件
		- [ ] 关于我页
		- [ ] 移动端适配
		- [ ] 添加加载动画
		- [ ] 音乐播放组件
	* 管理
		- [ ] 文章发布组件
		- [ ] 文章修改组件 => 文章发布组件
	---
* 后端
	* 用户api
		- [ ] 注册
		- [ ] 登录
		- [ ] 找回密码
		- [ ] 评论
	* 管理api
		- [ ] 发布文章
		- [ ] 修改文章
		- [ ] 删除文章

## 目录
|-- frontend/  
|　|-- src/（css + js）  
|　|-- index.html  
|-- backend/  
|　|-- api/（orm接口）  
|　|-- database/（数据库）  
|　|-- config/（配置文件）  
|　|-- test/（测试用）  
|　|-- app.py（主程序，调用api）  
|-- README.md  

## 难点
- 加载动画
	- [x] 打开首页之前的白屏，即过渡动画（最后在index.html中添加）
	- [ ] 切换路由之间的动画
	- [ ] 屏幕滚动，动态加载组件，即懒加载
	- [ ] 动态加载组件时的动画，即懒加载的动画
    - [x] v-for倒序迭代列表，直接用原型链v-for="(item, index) in Array.prototype.reverse.call(item)"
    - [ ] css hack，用来连接article-shadow和article-main
    - [ ] article-shadow的纵横比还是不对