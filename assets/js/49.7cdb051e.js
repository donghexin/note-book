(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{312:function(s,e,a){s.exports=a.p+"assets/img/markdown-img-paste-20190321230059642.18c6b052.png"},313:function(s,e,a){s.exports=a.p+"assets/img/markdown-img-paste-20190321231251846.985d37fb.png"},814:function(s,e,a){"use strict";a.r(e);var t=a(19),r=Object(t.a)({},(function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"_017-redis-replication-的完整流运行程和原理的再次深入剖析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_017-redis-replication-的完整流运行程和原理的再次深入剖析"}},[s._v("#")]),s._v(" 017. redis replication 的完整流运行程和原理的再次深入剖析")]),s._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#复制的完整流程"}},[s._v("复制的完整流程")])]),t("li",[t("a",{attrs:{href:"#数据同步相关的核心机制"}},[s._v("数据同步相关的核心机制")])]),t("li",[t("a",{attrs:{href:"#全量复制"}},[s._v("全量复制")])]),t("li",[t("a",{attrs:{href:"#增量复制"}},[s._v("增量复制")])]),t("li",[t("a",{attrs:{href:"#heartbeat"}},[s._v("heartbeat")])]),t("li",[t("a",{attrs:{href:"#异步复制"}},[s._v("异步复制")])])])]),t("p"),s._v(" "),t("h2",{attrs:{id:"复制的完整流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#复制的完整流程"}},[s._v("#")]),s._v(" 复制的完整流程")]),s._v(" "),t("p",[t("img",{attrs:{src:a(312),alt:""}})]),s._v(" "),t("ol",[t("li",[t("p",[s._v("slave node 启动，仅仅保存 master node 的信息")]),s._v(" "),t("p",[s._v("但是复制流程没开始，master 信息包括 host 和 ip ，\n那么是从哪儿来的？是在配置文件 redis.conf 里面的 slaveof 配置的")])]),s._v(" "),t("li",[t("p",[s._v("slave node 定时检查是否需要与 master 连接")]),s._v(" "),t("p",[s._v("内部有个定时任务，每秒检查是否有新的 master node 要连接和复制，如果发现，就跟 master node 建立 socket 网络连接")])]),s._v(" "),t("li",[t("p",[s._v("slave node 发送 ping 命令给 master node")])]),s._v(" "),t("li",[t("p",[s._v("口令认证")]),s._v(" "),t("p",[s._v("如果 master 设置了 requirepass，那么 salve node 必须发送 masterauth的口令过去进行认证")])]),s._v(" "),t("li",[t("p",[s._v("master node 第一次执行全量复制，将所有数据发给 slave node")])]),s._v(" "),t("li",[t("p",[s._v("master node 后续持续将写命令，异步复制给 slave node")])])]),s._v(" "),t("h2",{attrs:{id:"数据同步相关的核心机制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据同步相关的核心机制"}},[s._v("#")]),s._v(" 数据同步相关的核心机制")]),s._v(" "),t("p",[s._v("指的就是第一次 slave 连接 msater 的时候，执行的全量复制，该过程里面的一些细节的机制")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("master 和 slave 都会维护一个 offset")]),s._v(" "),t("p",[s._v("master 会在自身不断累加 offset，slave 也会在自身不断累加 offset")]),s._v(" "),t("p",[s._v("slave 每秒都会上报自己的 offset 给 master，同时 master 也会保存每个 slave的 offset")]),s._v(" "),t("p",[s._v("这个倒不是说特定就用在全量复制的，主要是 master 和 slave 都要知道各自的数据的 offset，才能知道互相之间的数据不一致的情况")])]),s._v(" "),t("li",[t("p",[s._v("backlog")]),s._v(" "),t("p",[s._v("master node 有一个 backlog，默认是 1MB 大小")]),s._v(" "),t("p",[s._v("master node 给 slave node 复制数据时，也会将数据在 backlog 中同步写一份")]),s._v(" "),t("p",[s._v("backlog 主要是用来做全量复制中断候的增量复制的")]),s._v(" "),t("p",[s._v("疑问：那么这个 backlog 里面是存储 offset 的吗？")])]),s._v(" "),t("li",[t("p",[s._v("master run id")]),s._v(" "),t("p",[s._v("通过 info server 命令可以看到 master run id")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@eshop-cache01 ~"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# redis-cli")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:637"),t("span",{pre:!0,attrs:{class:"token operator"}},[t("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[s._v("9")]),s._v(">")]),s._v(" info server\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Server")]),s._v("\nredis_version:3.2.8\nredis_git_sha1:00000000\nredis_git_dirty:0\nredis_build_id:6daa1ff954b79779\nredis_mode:standalone\nos:Linux "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.6")]),s._v(".32-431.el6.i686 i686\narch_bits:32\nmultiplexing_api:epoll\ngcc_version:4.4.7\nprocess_id:1045\nrun_id:9b3e4cb502e78b0b5664f66eeac6eceb36bc8e28   "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 这里")]),s._v("\ntcp_port:6379\nuptime_in_seconds:169663\nuptime_in_days:1\nhz:10\nlru_clock:9598685\nexecutable:/usr/local/bin/redis-server\nconfig_file:/etc/redis/6379.conf\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br")])]),t("p",[s._v("如果根据 host+ip 定位 master node，是不靠谱的，如果 master node 重启或者数据出现了变化，那么 slave node 应该根据不同的 run id 区分，run id 不同就做全量复制")]),s._v(" "),t("p",[t("img",{attrs:{src:a(313),alt:""}})]),s._v(" "),t("p",[s._v("如上图，解释了为什么要通过 run id 来定位 master node")]),s._v(" "),t("p",[s._v("如果需要不更改 run id 重启 redis，可以使用 redis-cli debug reload 命令")])]),s._v(" "),t("li",[t("p",[s._v("psync")]),s._v(" "),t("p",[s._v("从节点使用 psync 从 master node 进行复制，psync runid offset")]),s._v(" "),t("p",[s._v("master node 会根据自身的情况返回响应信息，可能是 FULLRESYNC runid offset 触发全量复制，可能是 CONTINUE 触发增量复制")]),s._v(" "),t("p",[s._v("解释下：假如 runid 与自身不符，那么久可以全量更新数据")])])]),s._v(" "),t("h2",{attrs:{id:"全量复制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#全量复制"}},[s._v("#")]),s._v(" 全量复制")]),s._v(" "),t("ol",[t("li",[t("p",[s._v("master 执行 bgsave，在本地生成一份 rdb 快照文件")])]),s._v(" "),t("li",[t("p",[s._v("master node 将 rdb 快照文件发送给 salve node")]),s._v(" "),t("p",[s._v("如果 rdb 复制时间超过 60 秒（可通过 repl-timeout 属性配置），那么 slave node 就会认为复制失败，可以适当调节大这个参数")]),s._v(" "),t("p",[s._v("对于千兆网卡的机器，一般每秒传输 100MB，6G 文件，很可能超过 60s")])]),s._v(" "),t("li",[t("p",[s._v("master node 在生成 rdb 时，会将所有新的写命令缓存在内存中，在 salve node 保存了 rdb 之后，再将新的写命令复制给 salve node，保证主从数据一致")])]),s._v(" "),t("li",[t("p",[s._v("client-output-buffer-limit slave 256MB 64MB 60")]),s._v(" "),t("p",[s._v("如果在复制期间，内存缓冲区持续消耗超过 64MB，或者一次性超过 256MB，那么停止复制，复制失败")]),s._v(" "),t("p",[s._v("什么意思呢？比如在等待 slave 同步 rdb 文件的时候，master 接收写的命令在缓冲区超过了 64m 的数据，那么此次复制失败")])]),s._v(" "),t("li",[t("p",[s._v("slave node 接收到 rdb 之后，清空自己的旧数据，然后重新加载 rdb 到自己的内存中，同时基于旧的数据版本对外提供服务")])]),s._v(" "),t("li",[t("p",[s._v("如果 slave node 开启了 AOF，那么会立即执行 BGREWRITEAOF，重写 AOF")])])]),s._v(" "),t("p",[s._v("总的来说，还是比较耗时的，rdb 生成、rdb 通过网络拷贝、slave 旧数据的清理、slave aof rewrite，很耗费时间")]),s._v(" "),t("p",[s._v("如果复制的数据量在 4G~6G 之间，那么很可能全量复制时间消耗到 1 分半到 2 分钟")]),s._v(" "),t("h2",{attrs:{id:"增量复制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#增量复制"}},[s._v("#")]),s._v(" 增量复制")]),s._v(" "),t("ol",[t("li",[s._v("如果全量复制过程中，master-slave 网络连接断掉，那么 salve 重新连接 master 时，会触发增量复制")]),s._v(" "),t("li",[s._v("master 直接从自己的 backlog 中获取部分丢失的数据，发送给 slave node，默认 backlog 就是 1MB")]),s._v(" "),t("li",[s._v("msater 就是根据 slave 发送的 psync 中的 offset 来从 backlog 中获取数据的")])]),s._v(" "),t("h2",{attrs:{id:"heartbeat"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#heartbeat"}},[s._v("#")]),s._v(" heartbeat")]),s._v(" "),t("p",[s._v("主从节点互相都会发送 heartbeat 信息")]),s._v(" "),t("ul",[t("li",[s._v("master 默认每隔 10 秒发送一次 heartbeat")]),s._v(" "),t("li",[s._v("salve node 每隔 1 秒发送一个 heartbeat")])]),s._v(" "),t("h2",{attrs:{id:"异步复制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#异步复制"}},[s._v("#")]),s._v(" 异步复制")]),s._v(" "),t("p",[s._v("master 每次接收到写命令之后，先在内部写入数据，然后异步发送给 slave node")])])}),[],!1,null,null,null);e.default=r.exports}}]);