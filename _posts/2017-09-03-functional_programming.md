---
layoutL post  
title: 函数式编程  
tags: [python]  
categories: [python]  
author: Moilk  
---

## 高阶函数

在python中，函数名其实就是指向函数的变量

```python
abs=10
abs(-10)	# 报错，'int' object is not callable
```

把`abs`指向`10`后，就无法通过`abs(-10)`这样调用原本的绝对值函数了。

当然，实际代码绝对不能这么写。要回复`abs`函数，请重启Python交互环境。

> 由于`abs`函数实际上是定义在`import builtins`模块中的，所以要修改`abs`变量的指向在其他模块中也生效，要用`import builtins; builtins.abs=10`。

**传入函数** 

既然变量可以指向函数，函数的参数能接受变量，那么一个函数就可以接受另一个函数作为参数，这种函数就称为**高阶函数**

函数可以作为参数传递给另一个函数，也可以作为返回值返回

### map

`map()`函数接收两个参数，一个是函数，一个是`Iterable`，`map`将传入的函数依次作用到序列的每个元素，并把结果作为新的`Iterable`返回。

```python
def f(x):
  return x*x
list(map(f,range(1,10))) # [1,4,9,16,25,36,49,64,81]
```

### reduce

`reduce()`函数接受两个参数，一个是函数，一个是`Iterable`，`map`把结果继续和序列的下一个元素做累积计算，其效果就是：

`reduce(f,[x1,x2,x3,x4])=f(f(f(x1,x2),x3),x4)`

比如说对一个序列求和，就可以用`reduce`实现：

```python
from functools import reduce
def add(x,y):
  return x+y
reduce(add,[1,3,5,7,9])	# 1+3+5+7+9=25
```

### filter

`filter()`函数接收两个参数，一个是函数，一个是`Iterable`，`filter`把传入的函数一次作用与每个元素，然后根据函数的返回值是`True`还是`False`决定保留还是丢弃该元素

例如用[埃氏筛法](http://baike.baidu.com/view/3784258.htm)计算素数可以如下实现：

```python
# 定义一个生成器，构造从3开始的奇数序列
def _odd_iter():
  n=1
  while True:
    n=n+2
    yield n
# 然后定义筛选函数，不能被n整除的数保留
def _not_divisible(n):
  return lambda x:x%n>0
# 定义一个生成器，不断返回下一个素数
def primes():
  yield 2
  it=_odd_iter()	# 初始序列
  while True:
    n=next(it)	# 返回序列的第一个数
    yield n
    # 去掉能被第一个数整除的数(包括它本身)
    it=filter(_not_divisible(n),it)
```

### sorted

排序算法

```python
# 按照绝对值从大到小的顺序排序
sorted([36,12,-23,43,-54],key=abs,reverse=True)
```

### 返回函数

高阶函数除了可以接收函数作为参数外，还可以把函数作为结果返回。返回一个函数时，要牢记这个函数并未执行，同时要记住返回函数中不要引用可能会发生变化的变量，不能可能会与预期结果不同。

### 返回函数

关键字`lambda`表示匿名函数

```python
f=lambda x:x*x
# 等价于
def f(x):
  return x*x
```

冒号前面是函数的参数，可以使用多个参数，用`,`分隔，还可以使用可变参数等更复杂的参数。冒号后面是返回结果的表达式。

> Python对匿名函数的支持有限，只有一些简单的情况下可以使用匿名函数

### 装饰器

在Python中函数也是一个对象，函数对象可以赋值给变量，可以通过变量来调用该函数。使用变量来引用函数后，还可以通过函数对象的`__name__`属性还获取函数对象的名字。

```python
def now():
  print('2017-09-10')
f=now
f.__name__	# 'now'
```

`` 以下引自[知乎-如何理解Python装饰器-刘志军的回答](https://www.zhihu.com/question/26930016)

 **装饰器**本质上是一个Python函数，它可以让其它函数在不需要做任何代码变动的前提下增加额外的功能，装饰器的返回值也是一个函数对象。它经常用于有切面需求的场景，比如：插入日志、性能测试、事务处理、缓存、权限校验等场景。装饰器是解决这类问题的绝佳设计，有了装饰器，我们就可以抽离出大量与函数功能本身无关的雷同代码并继续重用。

> 概括的讲，装饰器的作用就是为已经存在的对象添加额外的功能

先来看一个简单的例子：

```python
def foo():
  print('i am foo')
```

现在有一个新的需求，希望可以记录下函数的执行日志，于是在代码中添加日志代码：

```python
def foo():
  print('i am foo')
  logging.info('foo is running')
```

但是bar()、bar2()也有类似的需求吗，怎么破？如果在写一个logging在bar函数里边，就会造成大量雷同的代码。为了减少重复代码。我们可以重新定义一个函数：专门处理日志，日志处理完之后再执行真正的业务代码

```python
def use_logging(func):
  logging.warn('%s is running' % func.__name__)
  func()
  
def bar():
  print('i am bar')
  
  use_logging(bar)
```

上面的代码逻辑上不难理解，但要将一个函数作为参数传递给use_logging函数，这样破坏了原有代码的逻辑结构，可读性不高，而且还有对原本的bar函数调用进行修改，在外面套一个函数。

？？？那有没有更好的方式呢？？？

————> 当然有，那就是装饰器！！！！

**简单的装饰器**

```python
def use_logging(func):
  
  def wrapper(*args, **kwargs):
    logging.warn('%s is running' % func.__name__)
    return func(*args, **kwargs)
  return wrapper

def bar():
  print('i am bar')

bar=use_logging(bar)
bar()
```

函数use_logging就是装饰器，它把执行真正业务方法的func包裹在函数里面，看起来像是bar被use_logging装饰了。

`@`符号是装饰器的语法糖，在定义函数的时候使用，避免再一次复制操作。

```python
def use_logging(func):
  def wapper(*args, **kwargs):
    logging.warn('%s is running' % func.__name__)
    return func(*args)
  return wrapper

@use_logging
def bar():
  print('i am bar')
  
bar()
```

如上所示，使用`@`我们就省去bar=use_logging(bar)这一句了，直接调用bar()即可得到想要的结果。

> 装饰器在Python中使用如此方便都要归功于Python的函数能像普通对象一个作为参数传递给其它函数，可以被赋值给其他变量，可以作为返回值，可以被定义在另一个函数内。

**带参数的装饰器**

装饰器还有更大的灵活性，例如带参数的装饰器。在上面的装饰器调用中，比如@use_logging，该装饰器唯一的参数就是执行业务的函数。装饰器的语法允许我们在调用时，提供其他参数，比如@decorator(a)。这样，就为装饰器的编写和使用提供更大的灵活性。

```python
def use_logging(level):
  def decorator(func):
    def wrapper(*args, **kwargs):
      if level=="warn":
        logging.warn('%s is running' % func.__name__)
      return func(*args)
    return wrapper
  return decorator

@use_logging(level='warn')
def foo(name='foo'):
  print('i am %s' % name)
  
foo()
```

**类装饰器**

相比函数，类装饰器具有灵活度大、高内聚、封装性等优点。使用类装饰器还可以依靠类内部的`__call__``方法，当使用`@`形式将类装饰器附加到函数上时，就会调用此方法。

```python
class Foo(object):
  def __init__(self, func):
    self._func=funcc

def __call__(self):
  print('class decorator running')
  self.func()
  print('class decorator ending')
  
@Foo
def bar():
  print('bar')
```

**functools.wraps**

使用装饰器极大地复用了代码，但是他有一个缺点就是原函数的原信息不见了，比如函数的`docstring`、`__name__`、参数列表，先看例子：

```python
# 装饰器
def logged(func):
  def with_logging(*args, **kwargs):
    print func.__name__+'was called'
    return func(*args,**kwargs)
  return with_logging
# 函数
@logged
def f(x):
  # does some math
  return x+x*x
```

该函数完全等价于：

```python
def f(x):
  # does some math
  return x+x*x
f=logged(f)
```

不难发现，函数`f`被`with_logging`取代了，当然它的`docstring`，`__name__`就变成了`with_logging`函数的信息了。

```python
print f.__name__	# prints 'with_logging'
print f.__doc__		# prints None
```

这个问题就比较严重了，好在我们有`functools.wraps`，`wraps`本身也是一个装饰器，它能把原函数的元信息拷贝到装饰器函数中，这使得装饰器函数也有和原函数一个的元信息了。

```python
from functools import wraps

def logged(func):
  @wraps(func)
  def with_logging(*args, **kwargs):
    print func.__name__+'was called'
    return func(*args, **kwargs)
  return with_logging

@logged
def f(x):
  """does some math"""
  return x+x*x

print(f.__name__)	# prints 'f'
print(f.__doc__)	# prints 'does some math'
```

**内置装饰器**

`@staticmathod`

`@classmethod`

`@property`

### 偏函数

`functools.partial`的作用就是把一个函数的某些参数给固定住(也就是设置默认值)，返回一个新的函数，调用这个新函数就会更加简单。需要注意，仅仅是把参数的默认值重新设置了，在用的时候也可以对默认参数进行赋值。

```python
import functools
int2=functools.partial(int,base=2)
int2('1000000')				# 64
int2('1000000',base=10)		# 1000000
```

最后，创建偏函数时，实际上可以接收函数对象、`*args`、`**kwargs`这3个参数，当传入：

```python
int2=functools.partial(int,base=2)
```

实际上固定了`int()`函数的关键字参数`base`，也就是`int2('1000000')`相当于：

```python
kw={'base':2}
int('1000000',**kw)
```

当传入：

```python
max2=functools.partial(max,10)
```

实际上会把`10`作为`*args`的一部分自动加到**左边**，也就是`max(5,6,7)`相当于：

```python
args=(10,5,6,7)
max(*args)
```

