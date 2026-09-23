# Biểu diễn số nguyên dương trong các hệ số

> Nguồn: https://tiennhm.io.vn/en/blog/unsigned-integer-representation
> Biểu diễn số nguyên dương trong hệ thập phân, hệ nhị phân và hệ thập lục phân

> Bài viết giải thích cách biểu diễn số nguyên dương (unsigned integer) trong các hệ số khác nhau: hệ thập phân (decimal), hệ nhị phân (binary) và hệ thập lục phân (hexadecimal). Bài viết bao gồm cách chuyển đổi giữa các hệ số, cách máy tính lưu trữ số nguyên dương, và các ví dụ minh họa cụ thể. Đây là kiến thức nền tảng quan trọng để hiểu cách máy tính xử lý dữ liệu số ở cấp độ thấp.

Trong bài viết này, chúng ta sẽ tìm hiểu về cách biểu diễn số nguyên dương trong các hệ số: hệ thập phân, hệ nhị phân và hệ thập lục phân.

## Lý thuyết

### 1. Các hệ số đếm thường sử dụng trong máy tính

- Cơ số của một hệ: là số chữ số được dùng để biểu diễn các giá trị.
- Các hệ cơ bản:
    + Hệ nhị phân (B) hay hệ cơ số 2: dùng 2 chữ số 0,1 để biểu diễn tất cả các giá trị.
    > Ví dụ: 10012 = 1001B
    + Hệ bát phân (O) hay hệ cơ số 8: dùng 8 chữ số từ 0-7 để biểu diễn tất cả các giá trị.
    > Ví dụ: 7628 = 762O
    + Hệ thập phân (D) hay hệ cơ số 10: dùng 10 chữ số từ 0-9 để biểu diễn tất cả các giá trị.
    > Ví dụ: 198110 = 1981D = 1981
    + Hệ thập lục phân (H) hay hệ cơ số 16: Dùng 16 chữ - số: 10 số 0,1,2,3,4,5,6,7,8,9 và 6 chữ cái A,B,C,D,E,F để biểu diễn tất cả các số.
    > Ví dụ: 1B5E16 = 1B5EH

### 2. Chuyển đổi số nguyên dương sang hệ thập phân

**Ví dụ:**

- Chuyển đổi số 10012 sang hệ thập phân:
> 10012 = 1 × 23 + 0 × 22 + 0 × 21 + 1 × 20 = 1 × 8 + 0 × 4 + 0 × 2 + 1 × 1 = 9
- Chuyển đổi số 1E4A16 sang hệ thập phân:
> 1E4A16 = 1 × 163 + 14 × 162 + 4 × 161 + 10 × 160 = 7754

### 3. Chuyển đổi số nguyên dương từ hệ thập phân sang các hệ khác

#### 3.1. Từ hệ thập phân sang hệ nhị phân

Để chuyển đổi một số nguyên dương từ hệ thập phân sang hệ nhị phân:
- Ta thực hiện phép chia cho 2, được phần kết quả `m` và phần dư `r` (1 hoặc 0).
- Tiếp tực thực hiện phép chia phần kết quả `m` cho 2, cho đến khi kết quả `m = 0` thì dừng.
- Khi đó, giá trị nhị phân cần tìm chính là việc viết lần lượt phần dư `r` từ dưới lên.

** Ví dụ:**

#### 3.2. Từ hệ thập phân sang hệ thập lục phân

#### 3.3. Từ hệ thập phân sang hệ bát phân

Việc chuyển đổi số nguyên dương từ hệ thập phân sang hệ bát phân là tương tự như việc chuyển đổi từ thập phân sang nhị phân/ thập lục phân, chỉ khác ở đây là ta thực hiện phép chia cho 8.

### 4. Chuyển đổi số nguyên dương giữa hệ nhị phân, hệ thập lục phân và hệ bát phân

** Ví dụ:** Chuyển đổi số 10111110111111102 sang hệ thập lục phân (H) và hệ bát phân (O).

> Vậy: 10111110111111102 = BEFE16 = 1373768

## Các công cụ hỗ trợ chuyển đổi số nguyên dương giữa các hệ số

### 1. Calculator (Windows)

Để thực hiện chuyển đổi số nguyên dương giữa các hệ số, bạn làm theo các bước sau:
- Bước 1: Mở `Calculator` trên máy tính.
- Bước 2: Chọn `View` > `Programmer` hoặc nhấn tổ hợp phím `Alt + 3`.
- Bước 3: Nhập số cần chuyển đổi vào ô `Dec` (hệ thập phân).
- Bước 4: Chọn hệ số cần chuyển đổi ở các ô `Bin` (hệ nhị phân), `Oct` (hệ bát phân) và `Hex` (hệ thập lục phân).

Lưu ý: Khi nhập số vào ô `Dec`, bạn chỉ được nhập các chữ số từ 0-9. Nếu muốn nhập đầu vào là số ở các hệ khác, bạn cần chọn lại hệ số trước khi nhập.

        Hình 1. Chọn `View &gt; Programmer`.

        Hình 2. Chọn hệ số trước khi nhập dữ liệu.

### 2. RapidTables (Online)

Bạn có thể sử dụng trang web [RapidTables](https://www.rapidtables.com/convert/number/index.html) để chuyển đổi số nguyên dương giữa các hệ số.

**Ngoài ra bạn còn có thể sử dụng các trang web sau:**
- [BinaryHexConverter](https://www.binaryhexconverter.com/)
- [BinaryHex](https://binaryhexconverter.com/decimal-to-hex-converter)
- ...

## Bài tập

#### 1. Write each of the following decimal numbers in binary:

> Chuyển các số thập phân (hệ 10) sang nhị phân (hệ 2)

```
a. 2    => 0000 0010  	      	g. 15   => 0000 1111
b. 7    => 0000 0111            h. 16   => 0001 0000
c. 5 	=> 0000 0101	      	i. 20   => 0001 0100
d. 8    => 0000 1000         	j. 27   => 0001 1011
e. 9 	=> 0000 1001         	k. 32   => 0010 0000
f. 12   => 0000 1100         	l. 64   => 0100 0000
```

#### 2. Write each of the following binary numbers in decimal:

> Chuyển các số nhị phân (hệ 2) sang thập phân (hệ 10)

```
a. 00000101 => 5        		g.00110000 => 48
b. 00001111 => 15	      		h.00100111 => 39
c. 00010000 => 16	      		i.01000000 => 64
d. 00010110 => 22	      		j.01100011 => 99
e. 00001011 => 11 	      		k.10100000 => 160
f. 00011100 => 28	      		l.10101010 => 170
```

#### 3. Write each of the following binary numbers in hexadecimal:

> Chuyển các số hệ nhị phân (hệ 2) sang hệ thập lục phân (hệ 16)

```
a. 00000101 => 0005h    g.00110000 => 0030h
b. 00001111 => 000Fh    h.00100111 => 0027h
c. 00010000 => 0010h    i.01001000 => 0048h
d. 00010110 => 0016h    j.01100011 => 0063h
e. 00001011 => 000Bh    k.10100000 => 00A0h
f. 00011100 => 001Ch    l.10101011 => 00ABh
```

#### 4. Write each of the following hexadecimal numbers in binary:

> Chuyển các số hệ thập lục phân (hệ 16) sang hệ nhị phân (hệ 2)

```
a. 0005h    => 0000 0101    g. 0030h    => 0011 0000
b. 000Fh    => 0101 1111    h. 0027h    => 0010 0111
c. 0010h    => 0001 0000    i. 0048h    => 0100 1000
d. 0016h    => 0001 0110    j. 0063h    => 0110 0011
e. 000Bh    => 0000 1011    k. A064h    => 1010 0000 0110 0100
f. 001Ch    => 0001 1100    l. ABDEh    => 1010 1011 1101 1110
```

#### 5. Write each of the following hexadecimal numbers in decimal:

> Chuyển các số hệ thập lục phân (hệ 16) sang thập phân (hệ 10)

```
a. 00D5h => 213         g. 0B30h => 2864
b. 002Fh => 47          h. 06DFh => 1759
c. 0110h => 272			i. 1AB6h => 6838
d. 0216h => 534			j. 0A63h => 2659
e. 004Bh => 75			k. 02A0h => 672
f. 041Ch => 1052		l. 1FABh => 8107
```
