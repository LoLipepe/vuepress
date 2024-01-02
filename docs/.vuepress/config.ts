/*
 * @Author: 张成龙 17647428088@163.com
 * @Date: 2023-11-27 14:41:02
 * @LastEditors: 张成龙 17647428088@163.com
 * @LastEditTime: 2023-12-11 15:00:25
 * @FilePath: \vuePress\docs\.vuepress\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vuepress/config";

export default defineConfig({
  scss: {},
  title: "小张的博客",
  description: "这是我的第一个 VuePress 站点",
  themeConfig: {
    /* nav: [
      { text: "Home", link: "/" },
      { text: "Git", link: "/guide/test" },
    ], */
    sidebar: [
      ["/", "Home"],
      ["/guide/git", "Git"],
      ["/guide/vue2", "Vue 2"],
      ["/guide/vue3", "Vue 3"],
      ["/guide/vite", "Vite"],
    ],
  },
});
