# Helpful JavaScript Utility Functions

> Nguồn: https://tiennhm.io.vn/en/blog/helpful-javascript-utility-functions

> This post collects JavaScript utility functions I have found useful in real projects, including object helpers such as GetValuesByKey, FlattenObject and FlattenObjectWithKey. Each one comes with code examples, test cases and concrete use cases. These functions help developers handle complex data efficiently and reuse code across JavaScript/TypeScript projects.

JavaScript is one of the most widely used programming languages in the world today. Companies such as Google, Facebook and Microsoft use it to build web applications. It is a powerful language capable of building complex web applications, and a flexible one that works just as well for simple ones.

In this post I will list some of the most useful JavaScript utility functions I have used in my own projects.

## 1. GetValuesByKey

This function collects every value stored under the same field name within an `object`, including nested child objects. It returns an array of the values it finds.

        {GetValuesByKey}

        {GetValuesByKeyTest}

## 2. Flatten object

### 2.1. Flatten object
This function flattens an `object` containing nested child objects. It returns a new `object` whose keys are the keys of those nested objects.

        {FlattenObject}

        {FlattenObjectTest}

### 2.2. Flatten object with key

This function also flattens an `object` containing nested child objects, but the resulting keys are prefixed with the parent object's key.

        {FlattenObjectWithKey}

        {FlattenObjectWithKeyTest}
