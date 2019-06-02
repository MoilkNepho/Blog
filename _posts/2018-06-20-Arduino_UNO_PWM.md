---
layout: post  
title: Arduino UNO PWM机制  
tags: [硬件]  
categories: [硬件]  
author: Moilk  
excerpt: "调光技术"  
---

### Timer1控制寄存器

- 名称： TCCR1A
- Offset：0x80
- Reset：0x00

![image-20180620134911042]({{site.baseurl}}/assets/images/hardware/image-20180620134911042.png)



- 名称：TCCR1B
- Offset：0x81
- Reset： 0x00

![image-20180620135816591]({{site.baseurl}}/assets/images/hardware/image-20180620135816591.png)

**解释说明：**

1. WGM1x：波形生成模式(Waveform Generation Mode)，用于设置时钟处于五种工作模式中的哪种

| Mode | WGM13 | WGM12 (CTC1)(1) | WGM11 (PWM11)(1) | WGM10 (PWM10)(1) | Timer/Counter 操作模式 |  TOP   | Update of OCR1x at | TOV1 Flag Set on |
| :--: | :---: | :-------------: | :--------------: | :--------------: | :--------------------: | :----: | :----------------: | :--------------: |
|  0   |   0   |        0        |        0         |        0         |        普通模式        | 0xFFFF |     Immediate      |       MAX        |
|  1   |   0   |        0        |        0         |        1         |   相位修正PWM, 8-bit   | 0x00FF |        TOP         |      BOTTOM      |
|  2   |   0   |        0        |        1         |        0         |   相位修正PWM, 9-bit   | 0x01FF |        TOP         |      BOTTOM      |
|  3   |   0   |        0        |        1         |        1         |  相位修正PWM, 10-bit   | 0x03FF |        TOP         |      BOTTOM      |
|  4   |   0   |        1        |        0         |        0         |          CTC           | OCR1A  |     Immediate      |       MAX        |
|  5   |   0   |        1        |        0         |        1         |    快速PWM, 8- bit     | 0x00FF |       BOTTOM       |       TOP        |
|  6   |   0   |        1        |        1         |        0         |    快速PWM, 9- bit     | 0x01FF |       BOTTOM       |       TOP        |
|  7   |   0   |        1        |        1         |        1         |    快速PWM, 10- bit    | 0x03FF |       BOTTOM       |       TOP        |
|  8   |   1   |        0        |        0         |        0         |   相位与频率修正PWM    |  ICR1  |       BOTTOM       |      BOTTOM      |
|  9   |   1   |        0        |        0         |        1         |   相位与频率修正PWM    | OCR1A  |       BOTTOM       |      BOTTOM      |
|  10  |   1   |        0        |        1         |        0         |      相位修正PWM       |  ICR1  |        TOP         |      BOTTOM      |
|  11  |   1   |        0        |        1         |        1         |      相位修正PWM       | OCR1A  |        TOP         |      BOTTOM      |
|  12  |   1   |        1        |        0         |        0         |        CTC模式         |  ICR1  |     Immediate      |       MAX        |
|  13  |   1   |        1        |        0         |        1         |          保留          |   -    |         -          |        -         |
|  14  |   1   |        1        |        1         |        0         |        快速PWM         |  ICR1  |       BOTTOM       |       TOP        |
|  15  |   1   |        1        |        1         |        1         |        快速PWM         | OCR1A  |       BOTTOM       |       TOP        |

2. COM1x: 