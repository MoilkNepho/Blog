---
layoutL post  
title: python中常用的数据类型  
tags: [python]  
categories: [python]  
author: Moilk  
---

## 四种数据类型

### list

list，列表，是一种有序的集合，可以随时添加和删除其中的元素

```python
classmates = ['Michael', 'Bob','Tracy']	# 初始化
classmates.append('Adam')         # 末尾追加
classmates.insert(1,'Jack')       # 中间插入
classmates.pop()                  # 末尾删除
classmates.pop(2)                 # 中间删除
classmates[2]='Moilk'             # 直接赋值
s=[1,True,'Apple']                # 元素类型可以不同
s=['pyton','java',['asp','php'],'schema']       # 因此也可以嵌套
s[2][1]=='php'                    # 可以像多维数组那样访问
len[s]                            # 获取它的长度
s.sort()                          # 排序，如果不可排序则会报错，如数字和字符串或者子list混在一起
s=range[1,5,2]					  # s=[1,3]
s[-2]        					  # 取倒数第二个元素
```

### tuple

tuple，元组，也是一种有序集合，与list很相似，但**不同**的是tuple一旦初始化就不能修改。

```python
classmates=('Michael','Bob','Tracy')	# 定义一个元组
# 定义完后就不能修改
# 没有inster、append、pop等方法
t=()                               # 定义一个空的元组
t=(1)    # 这个定义的不是一个元组，也是1这个数
t=(1,)                             # 这才是定义了1个元素的元组
t=('a','b',['A','B'])              # tuple的元素可为list之类的可变对象
t[2][1]='C'                        # 仍然像访问二维数组那样访问它,可修改
l=list(t)
```



### dict

dict，字典，相当于其它语言中的map，使用键值对进行存储，具有极快的查找速度。

dict之所以查找起来非常快，是因为它可以直接通过`key`计算出`value`存放的地址，这个计算方法称为哈希算法(Hash)，要保证Hash的正确性，作为`key`的对象就不能改变，即**`key`必须为不可变对象**，如字符串、整数等，而`list`是可变的，所以不能作为`key`。

```python
d={'Michael':95,'Bob':75,'Tracy':85}		# 创建一个dict
d['Bob']=60       # 修改key的值，不过如果key不存在，就会报错
if 'Bob' in d:    # 这样可判断key是否存在
d.get('Thomas')   # 获取key对应的值，如果key不存在就会返回None
d.pop('Bob')      # 删除一个key
```

> 注意`dict`内存存放的顺序和`key`放入的顺序没有半毛钱关系！

`dict`和`list`比较，`dict`有以下几个特点：

1. 查找和插入的速度极快，不会随着`key`的增加而变慢；
2. 需要占用大量的内存，内存浪费多。

而`list`相反：

1. 查找和插入的时间随着元素的增加而增加；
2. 占用空间小，浪费内存很少。

所以，`dict`是用**空间换取时间**的一种方法。

### set

`set`和`dict`类似，也是一组`key`的集合，但不存储`value`。由于`key`不能重复，所以在`set`中没有重复的`key`。

```python
s=set([1,2,3])		# 创建一个set需要使用一个list作为数据的输入
s.add(4)            # 使用add往set里面添加元素{1，2，3，4}
s.add(4)            # 可以重复添加元素，但不会有效果{1，2，3，4}
s.remove(4)         # 通过remove方法删除元素{1，2，3}
s1=set([1,2,3])
s2=set([2,3,4])
s=s1&s2             # set可以做集合运算{2,3}
```

## 高级特性

### 切片

```python
L[0:3]              # 取L的前三个元素，不包括索引为3的元素
L[:3]		        # 如果冒号前是0，可以省略
L[2:]			    # 如果冒号后是len(L)，也可以省略
L[:]				# 等于L[0:len(L)]
L[-9:-3]			# 也可以用倒数，等于L[len(L)-9:len(L)-3]
L[::2]              # 隔两个取一个
(0,1,2,3,4)[:3]             # tuple也可以做切片，结果还是tuple
'Hello world!'[:5]          # 字符串也可以切
```

### 迭代

通过`for`来遍历一个对象的所有元素，这种遍历称为**迭代**。在Python中，迭代是通过`for … in`来完成的，它可以作用于list或tuple上，还可以作用在其他可迭代的对象上，如dict、字符串等。

```python
d={'a':1,'b':2,'c':3}
# 迭代key
for key in d:
  print(key)
# 迭代value
for value in d.values():
  print(value)
# 使用enumerate函数可以把list变成索引-元素对
# 这样就可以同时迭代索引和元素本身
for i,value in enumerate(['a','b','c']):
  print(i,value)
# python中同时引用两个变量是很常见的
for x,y in [(1,1),(2,2)]:
  print(x,y)
# 也可以同时迭代list的key和value
for k,v in d.items():
  print(k,v)
```

迭代还可以用于其他可迭代的对象上，可以使用`collections`模块的`Iterable`类型判断一个对象是不是可迭代对象

```python
from collections import Iterable
if isinstance('abc',Iterable):
  print('str is iterable')
```

### 列表生成式

List Comprehensions是python内置的用于创建list的生成式，简单但是功能强大,如`list(range(1,100))`，但这只是最简单的用法，列表生成器可以用一行语句生成复杂的`list`

```python
# 循环：[1,4,9,16,25,36,49,64,81,100]
[x*x for x in range(1,11)]
# 循环 + 条件:[1,9,25,49,81]
[x*x for x in range(1,11) if x%2]
# 双循环
[m*n for m in range(1,11) for n in range(10,0,-1) if m%2 if not n%2]
# 或者这样写
[m*n for m in range(1,11) if m%2 for n in range(10,0,-1)) if not n%2]
# 再或者这样
[m*n for m in range(1,11) for n in range(10,0,-1) if m%2 and not n%2]
[s.lower() for s in 'Hello, Moilk']
```

### 生成器

列表生成式会直接创建一个列表，而如果我们要处理的数据量很大，直接保存在列表中是非常占用内存的，我们需要一种能**边处理边生成后续元素的机制**，这种机制称为generator。

要定义一个生成器只需要相对于列表生成器将`[]`改为`()`即可，可以通过`next()`函数获得generator的下一个返回值

```python
g=(x*x for x in range(10))
next(g)
```

`generator`保存的是算法，每次调用next()的时候就会计算出下一个值，直到计算完最后一个元素，没有更多元素的时候，就会抛出`stopIteration`的错误。

另外，generator也是可迭代对象，可以用`for`循环进行调用，这样就不用担心`stopIteration`的错误。

```python
g=(x*x for x in range(10))
for n in g:
  print(n)
```

如果生成器的算法比较复杂没法用列表生成式的方式实现的时候，还可以用在函数中使用`yield`关键字来实现。

```python
def fib(max):
  n,a,b=0,0,1
  while n<max:
    yield b		# 每次调用next()，会在这里返回
    a,b=b,a+b
    n=n+1
  return 'done'
```

如果一个函数定义中包含`yield`关键字，那么这个函数就不再是一个普通的函数，而是一个`generator`。`generator`的执行流程跟普通的函数不一样。函数是顺序执行，遇到`return`语句或者最后一行函数用语句就返回；而`generator`在每次调用`next()`的时候执行，遇到`yield`语句返回，再次执行从上次返回的`yield`语句处继续执行。

```python
def odd():
  yield 1	# next()返回
  yield 2	# next()返回
  yield 3	# next()返回
```

如果已经没有`yield`可以执行了，再调用next()的话就会报错

```python
Traceback(most recent call last):
  File "<stdin>", line 12,in <module>
StopIteration
```

而实际上，我们基本上不会用`next()`来调用`generator`，而是直接使用`for`循环来迭代：

```python
for n in fib(6):
  print(n)
```

但是使用`for`循环调用`generator`时会发现拿不到`gennerator`的`return`语句的返回值。如果想要拿到返回值，必须捕获`StopIteration`错误，返回值包含在`StopIteration`的value中：

```python
g=fib(6)
while True:
  try:
    x=next(g)
  except StopIteration as e:
    print('Generator return value:',e.value)
    break
```

### 迭代器

- 可以直接用于`for`循环的对象称为**可迭代对象：`Iterable`**
- 可以被`next()`函数调用并不断返回下一个值得对象称为**迭代器：`Iterator`**

```python
from collections import Iterable, Iterator
isinstance([],Iterable)		# True, list可对迭代对象
isinstance([],Iterator)		# False, list不是迭代器
g=(x for x in range(10))
isinstance(g,Iterator)		# True, 迭代器g是迭代器
isinstance(g,Iterable)		# True, 迭代器g是可迭代对象
```

生成器都是`Iterable`对象，但`list`、`dict`、`str`虽然是`Iterable`，却不是`Iterator`。

把`list`、`dict`、`str`等`Iterable`变成`Iterator`可以使用`iter()`函数。

```python
isinstance(iter([]),Iterator)	# True
```

`for`循环本质上就是通过不断调用`next()`函数实现的

```python
for x in [1,2,3,4,5]:
  pass
# 完全等价于
it=iter([1,2,3,4,5])
while True:
  try:
    x=next(it)
  except StopIteration:
    break
```



---

> 引自：[廖雪峰Python教程](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000)


