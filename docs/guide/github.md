## vuepress 部署到GitHub Pages 使用 Github Actions 
1.生成ACCESS_TOKEN: 在我们GitHub的个人设置中，点击 `Settings`，选择 `Developer settings`，然后选择 `Personal access tokens`，然后选择 `Tokens (classic)`，点击 `Generate new token(classic)`，在 `Note` 中填写一个备注，然后选择 `repo`，最后点击 `Generate token`。
2.在个人项目仓库页面上，点击 `Settings`，选择 `Secrets and variables`，然后点击 `Actions` ，然后点击 `New repository secret`，在 `Name` 中填写 `ACCESS_TOKEN` ，在 `Value` 中填写你生成的 ACCESS_TOKEN。
3.设置Actions权限: 在个人项目仓库页面上，点击`Settings`，选择`Actions`，然后点击`General`，然后选择`Workflow permissions`，然后选择 `Read and write permissions` ,并且勾选 `Allow GitHub Actions to create and approve pull requests` 。
4. 创建一个Github仓库，命名为：`<username>.github.io`
5. 创建一个分支，命名为：`main`
6. 创建一个 `.github/workflows/deploy.yml` 文件，内容如下：
```
name: Deploy

# Controls when the workflow will run
on:
# 对main分支的提交和拉去操作执行监听
push:
    branches: [ "main" ]
pull_request:
    branches: [ "main" ]

# Allows you to run this workflow manually from the Actions tab
workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
# This workflow contains a single job called "build"
build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
    # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
    - uses: actions/checkout@v3
    
    # 解决v17版本 Error:0308010C:digital envelope routines::unsupported
    - name: Install NodeJS
        uses: actions/setup-node@v3
        with:
        node-version: '16.16.0'

    # 打包 打包命令与package.json中一致
    - name: Build
        run:  |
        npm i
        npm run docs:build

    # 部署到 GitHub Pages 下面的uses是固定的他的GitHub: https://github.com/JamesIves/github-pages-deploy-action
    - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }} # 也就是我们刚才生成的 secret
        BRANCH: gh-pages # 部署到 gh-pages 分支，因为 main 分支存放的一般是源码，而 gh-pages 分支则用来存放生成的静态文件(不用自己创建,程序会自动创建分支)
        FOLDER: docs/.vuepress/dist # vuepress 生成的静态文件存放的地方(根据需求自行修改)
```
7.点击项目仓库中的 `Settings>>Pages>>` 中的 `Branch` 选择 `gh-pages` ,路径选择 `/` 然后点击 `Save` 保存