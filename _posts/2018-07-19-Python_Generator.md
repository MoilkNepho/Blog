---
layout: post  
title: Python生成器  
tags: [python]  
categories: [python]  
author: Moilk  
---

在Python中，我们可以使用**列表生成式**创建一个列表:

```python
>>> L = [x * x for x in range(10)]
>>> L
>>> [1, 4, 9, 16, 25, 36, 49, 64, 81]
```

但是这样产生的列表元素都被保存在内存中，占用内存空间。如果数据能够在我们需要的时候产生出来，也就是**懒执行**，这在有些应用中会更加合适。Python中有种一边循环一边计算的机制，称为**生成器**。

### 生成器表达式

生成器的第一种使用方法是将列表生成式中的`[]`改成`()`，这样就创建了一个**生成器表达式**：

```python
>>> g = (x * x for x in range(10))
>>> g
<generator object <genexpr> at 0x1234e4255>
```

上面代码中`g`就是一个生成器，生成器实现了**迭代器**的方法，可以把它作为迭代器用在`for`循环中，也可以使用`next(g)`函数获取生成器的下一个返回值。

```python
>>> next(g)
0
>>> next(g)
1
>>> next(g)
4
>>> next(g)
9
>>> next(g)
16
>>> next(g)
25
>>> next(g)
36
>>> next(g)
49
>>> next(g)
64
>>> next(g)
81
>>> next(g)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

生成器保存的是算法，每次显示或者隐式(使用`for`循环)调用`next()`时，就会计算出下一个元素，而当没有下一个元素的时候，程序就会抛出`StopIteration`异常。

### 生成器函数

Python中，如果一个函数中使用了`yield`关键字，那么这个函数就是一个生成器。

生成器跟普通函数的执行流程不一样，普通函数顺序执行，遇到`return`语句或者最后一条函数语句就返回。而生成器函数是在每次调用`next()`的时候执行，遇到`yield`语句返回，再次执行时从上次返回的`yield`语句处继续执行。

```python
def fibonacci():
    a, b = (0, 1)
    while True:
        yield a
        a, b = b, a+b
f = fibonacci()
next(f)	# => 0
next(f)	# => 1
next(f)	# => 1
next(f)	# => 2
```

如上所示，通过生成器，很容易写出一个无限斐波那契数列生成函数。执行`f=fibonacci()`时，`fibonacci`函数并没有真正执行，而是产生一个生成器对象。执行`next(f)`时执行生成器函数，遇到`yield`语句返回，再次遇到`next(f)`时，继续从上次`yield`处执行生成器函数。

以上生成器函数如果用`iterator`来写的话，如下所示：

```python
class Fibonacci():
    def __init__(self):
        self.a, self.b = (0,1)
    def __iter__(self):
        return self
    def __next__(self):
        result = self.a
        self.a, self.b = self.b, self.a + self.b
        return result
```

显然，生成器函数的写法更加优雅。

### 生成器与控制流

生成器实现了懒执行，存储算法而不是数据，在需要数据的时候才通过算法去产生这个值。而跳出“产生数据”这个作用，生成器其实是实现了一种控制流，主函数调用`next`时，开始执行生成器函数，而生成器函数中遇到`yield`语句，则将数据和执行流返回到主函数，而主函数中再次调用`next`时，就从上次返回处继续执行生成器函数。

> Java中也有一个`yield`方法，`Thread.yield()`方法的作用是：暂停当前正在执行的线程，并执行其他线程

上面说到，`yield`语句会把数据和执行流返回到主函数，而实际上，python还允许我们在将控制流交还给生成器时，给生成器传入数据。

```python
def avr():
    sum = 0
    num = 0
    while True:
        sum += (yield sum/num if num > 0 else 0)
        num += 1
x = avr()
x.send(None)	# => 0
x.send(1)		# => 1.0
x.send(2)		# => 1.5
x.send(3)		# => 2.0
```

如上所示是一个求平均值的函数（每加入一个值，重新计算平均值）。`yield`语句将其右边表达式的值返回给主函数，而整个`yield`语句的返回值为主函数再次调用`send(value)`方法时传入`value`。

```python
x = yield 10
y = 10 + (yield)
foo(yield 42)
```

### yield from

Python3.3的[PEP380](https://www.python.org/dev/peps/pep-0380/)添加了`yield from`也语法，允许一个生成器将其部分操作委派给另一个生成器。`yield from`产生的主要动机，在于使生成器能够更容易分成多个拥有`send`和`throw`方法的子生成器（就像一个大函数可以分为多个子函数。Python中生成器是协程`coroutine`的一种形式，但他的局限性在于只能向它的直接调用者返回数据，这意味着包含`yield`的代码不能像其他代码那样被分离出来放到单独的函数中。

> **PEP**: Python Enhancement Proposals，Python增强建议书，一个PEP是一份为Python社区提供各种增强功能的技术规格，也是提交新特性，以便让社区指出问题，精确化技术文档的提案

`yield from`的语法如下所示：

```python
yield from <expr>
# 相当于
for v in <expr>:
    yield v
```

其中`<expr>`是一个`iterator`迭代器，迭代器从头迭代到尾，期间它会直接向外部生成器的调用者提供(和接收)数据。另外，如果这个迭代器本身也是一个生成器的话，子生成器中可以执行`return`语句，`return`的值会成为外部生成器中`yield from`表达式的值。

1. `iterator`返回的任何值会直接传送给外部调用者；
2. 对外部生成器进行`send`，值会直接发送给`yield from`的子迭代器。如果发送的值为`None`，迭代器的`__next__()`方法会被调用；如果发送的值非空，迭代器的`send()`方法会被调用；如果子迭代器抛出`StopIteration`，执行流会回到外部生成器；
3. `yield from`表达式的值为内部生成器`return`的值。

