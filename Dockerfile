# 使用 node 的官方镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果有）
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到容器
COPY . .

# 构建 React 应用
RUN npm run build

# 全局安装 serve，用于托管静态文件
RUN npm install -g serve

# 使用 serve 来托管静态文件
CMD ["serve", "-s", "build", "-l", "3000"]

# 暴露端口
EXPOSE 3000
