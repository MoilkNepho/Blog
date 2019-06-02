---
layout: post  
title: eagle中的层  
Tags: [硬件]
category: [硬件]  
author: moilk  
---

### Eagle电路板编辑器中重要的层



| 编号 |   名称    | 用途           |
| :--: | :-------: | :------------- |
| 1 | 顶层(Top) | 容纳顶层的连线 |
| 2~15 | 内层(Inner Layers) | 容纳位于顶层和底层之间的内部层的走线 |
| 16 | 底层(Bottom) | 容纳底层的连线 |
| 17 | 焊盘(Pads) | 直通焊盘 |
| 18 | 过孔(Vias) | 直通过孔 |
| 19 | 飞线(Unrouted) | 未布线的元件 |
| 20 | 尺寸(Dimension) | 电路板外形 |
| 21/22 | 顶层/底层元件位置(tPlace/bPlace) | 容纳元器件的外形--用丝印显示 |
| 23/24 | 顶层/底层原始元件(tOrigin/bOrigin) | 需要移动或旋转的元件 |
| 25/26 | 顶层/底层元件名称(tName/bName) | 容纳元件名称--用丝印显示 |
| 27/28 | 顶层/底层元件数值(tValue/bValue) | 容纳元件数值--用丝印显示 |
| 29/30 | 顶层/底层停止(tStop/bStop) | 停止应用阻焊(用于过孔) |
| 31/32 | 顶层/底层焊膏(tCream/bCream) | 定义为使用焊膏而剪切的区域 |
| 33/34 | 顶层/底层饰面(tFinish/bFinish) | 金属饰面材料的掩膜(例如金触点) |
| 35/36 | 顶层/底层胶(tGlue/bGlue) | 胶掩膜 |
| 37/38 | 顶层/底层测试(tTest/bTest) | 提供附加信息 |
| 39/40 | 顶层/底层禁区(tKeepout/bKeepout) | 元件的限制区域 |
| 41/42/43 | 铜金属禁区(tRestrict/bRestrict/vRestrict) | 铜金属限制区域 |
| 44 | 钻孔(Drill) | 直通孔(导电)，也称过孔 |
| 45 | 穿孔(Hole) | 直通孔(不导电) |
| 46 | 铣削(Milling) | 为铣床绘制轮廓 |
| 47 | 测量(Measure) | 尺寸标注 |
| 48 | 文档(Document) | 电路板文档--打印用 |
| 49 | 基准(Reference) | 用于对其的参考标志 |
| 51/52 | 顶层/底层文件(tDocu/bDocu) | 电路板文档--非打印用 |

