---
layout: post  
title: Java中容器基础  
tags: [java,容器]  
categories: [java]  
author: Moilk  
excerpt: "Java中容器基础"  
---

## 🧐 为什么要用容器？  

容器（即持有对象）是Java中的一种基本编程工具，它可以弥补普通数组的两个缺陷：  

1. 大小固定：容器可以自动扩容。  
2. 类型固定：如果不用尖括号指定类型，其实可以在一个容器里边同时存放不同的类型。  

```java
@SuppressWarnings("unchecked")	// 添加注解以消除警告⚠️
public static void main(String[] args){
	ArrayList apples=new ArrayList();	// 没有用尖括号指定容器存放什么类型的元素
	for(int i=0;i<3;i++){
		apples.add(new Apple());	// 编译器会警告：使用了未经检查或不安全的操作⚠️
	}
	apples.add(new Orange());
	for (int i=0;i<apples.size();i++){
        // 如果容器没有指定类型，那么get方法返回的对象是Object类型，因此需要强制类型转换
		System.out.println(((Apple)apples.get(i)).id());
        // ❎当执行到orange时，虚拟机会抛出ClassCastException的异常，提示Orange不能强制转换为Apple
	}
}

```

## 🤨 有哪些容器？   

![image-20181126213800872]({{site.baseurl}}/assets/images/java/image-20181126213800872-3239481.png)  

Java中的主要容器包括`Collection`和`Map`两类（Hashtable基本上可以说是弃用了*deprecated*），`Collection`用于存放一个个独立的对象，而`Map`用于存放两个对象组成的键值对(Key-Value)。平时所见的链表、栈、队列都属于`Collection`，而所谓的散列表就属于`Map`。  

### 💊 Collection  

![image-20181126211002965]({{site.baseurl}}/assets/images/java/image-20181126211002965-3237803.png)

如上所示为`Collection`的UML类图，惊奇的发现，与C++不同，我们常见的一些数据结构`Set`(集合)、`List`(列表)、`Queue`(队列)居然不是类，而是接口（`Map`也是接口）。各种`extends`和`implements`关系错综复杂。  

可能是为了实现的方便吧，java中Collection并没有按照我们想象的那样分成集合、列表、堆栈、队列，相互独立，Java中集合相对独立，而堆栈和队列则是使用列表来实现的，`Stack`继承自`AbstractList`，而`Queue`则只是一个接口，使用的时候一般用一个`Queue`引用来引用一个`LinkedList`（链表）。  

**1）Set**  

`set`是一种**没有重复元素的`Collection`**：a. 接口和`Collection`一样；b. 没有重复元素。  

Java中`set`有三种常见的实现，他们主要的区别是元素的存储方式不同：  

- `HashSet`：用的最多的一种`Set`，使用Hash来保存元素以提高访问速度，因此访问时元素顺序是杂乱的。  
- `LinkedHashSet`：使用hash来提高访问速度，但是将元素保存在了LinkedList里边，所以元素是按照插入顺序存放的。  
- `TreeSet`：使用红黑树保存数据，元素是有序排列的。  

**2）List**  

`List`是最常用的容器，一般使用自动扩容的数组或者链表实现。Java中常见的`List`有：

- `LinkedList`：使用链表实现的`List`，插入和删除元素的效率很高，但是随机访问的效率低；
- `ArrayList`：使用数组实现，随机访问的效率很高，但是插入和删除元素的效率低；
- `Vector`：和`ArrayList`一样都是使用数组实现的，与其不同的是`Vector`是**线程安全**的，同一时间只能有一个线程对其进行写操作。也正因为有线程安全机制，`Vector`的效率比`ArrayList`低，所以如果没有线程安全的需求，一般不用`Vector`；
- `Stack`：继承自`Vector`，是一种“先入后出（LIFO）”的数据结构，但是，可能是历史原因吧，`Stack`继承自`Vector`，所以效率不高，Java官方也推荐有LIFO需求时优先使用`ArrayDeque`，如：` Deque<Integer> stack = new ArrayDeque<Integer>(); ` 

**3）Queue**  

**`Queue`**是一种“先入先出(FIFO)”的容器，如上面的类图所示，Java中的`LinkedList`实现了`Queue`接口，因此，Java中一般把`LinkedList`作为`Queue`使用（用`Queue`接口调用`LinkedList`），即`Queue<Integer> queue = new LinkedList<Integer>()`。  

**`PriorityQueue`**即**优先队列**，是实现了`Queue`接口的另一个类，普通`Queue`里边的元素会按照插入顺序来进行FIFO，而`Priority`中的元素会按照某种优先级来进行FIFO，即优先级高的元素会自动放在队列的头部。默认情况下的优先级会按照数据的值从大到小排列，也可以实现一个自己的`Comparator`传给`PriorityQueue`的构造器，从而自定义优先级顺序。  

**`Deque`**即**双向队列**，它也是一个接口，继承自`Queue`，所以可以当做`Queue`使用，但是他又实现了LIFO的接口：`push(e)`和`pop()`等，因此也可以当做`Stack`使用。实现了`Deque`接口的类主要有`LinkedList`和`ArrayDeque`：  

- 使用FIFO队列：`Queue<Integer> queue = new LinkedList<Integer>();`  
- 使用LIFO堆栈：`Deque<Integer> stack = new ArrayDeque<Integer>(); ` 

###  💣 Map  

![image-20181126211045494]({{site.baseurl}}/assets/images/java/image-20181126211045494-3237846.png)

`Map`是保存“键值对”的一种数据结构，而在Java中`Map`是一种接口，而`Map`具体的实现常见的有三种：`HashMap`、`LinkedHashMap`和`TreeMap`，之间的区别也是存储方式的差异，与`Set`中的情况类似。  

除了以上三种外，Java中的`Hashtable`也实现了`Map`接口，`Hashtable`出现的时间在`HashMap`之前，目前一般认为`Hashtable`是一种过时了的类，它和`HashMap`最大的区别就是`Hashtable`是线程安全的，所以效率会比`HashMap`低。Java官方文档也指出，如果没有线程安全的需求，推荐使用`HashMap`，而如果是在有线程安全需求的高并发应用中，则推荐使用 `ConcurrentHashMap`。  

