Here’s a brief explanation and examples for **Binary**, **Decimal**, **Hexadecimal**, and **Octal** number systems:

---

### **1. Binary Number System**

- **Base**: 2
- **Digits Used**: 0, 1
- **Example**: `1010` (binary)
    - Conversion to Decimal: 1×23+0×22+1×21+0×20=8+0+2+0=101 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 0 \times 2^0 = 8 + 0 + 2 + 0 = 10
    - So, `1010` in binary is `10` in decimal.

---

### **2. Decimal Number System**

- **Base**: 10
- **Digits Used**: 0, 1, 2, ..., 9
- **Example**: `45` (decimal)
    - Conversion to Binary:
        - Divide by 2: 45÷2=22 45 \div 2 = 22 remainder 11
        - 22÷2=11 22 \div 2 = 11 remainder 00
        - 11÷2=5 11 \div 2 = 5 remainder 11
        - 5÷2=2 5 \div 2 = 2 remainder 11
        - 2÷2=1 2 \div 2 = 1 remainder 00
        - 1÷2=0 1 \div 2 = 0 remainder 11
        - Result (bottom to top): `101101` (binary).

---

### **3. Hexadecimal Number System**

- **Base**: 16
- **Digits Used**: 0, 1, ..., 9, A (10), B (11), C (12), D (13), E (14), F (15)
- **Example**: `1A3` (hexadecimal)
    - Conversion to Decimal: 1×162+A×161+3×160=1×256+10×16+3×1=256+160+3=4191 \times 16^2 + A \times 16^1 + 3 \times 16^0 = 1 \times 256 + 10 \times 16 + 3 \times 1 = 256 + 160 + 3 = 419
    - So, `1A3` in hexadecimal is `419` in decimal.

---

### **4. Octal Number System**

- **Base**: 8
- **Digits Used**: 0, 1, ..., 7
- **Example**: `57` (octal)
    - Conversion to Decimal: 5×81+7×80=5×8+7×1=40+7=475 \times 8^1 + 7 \times 8^0 = 5 \times 8 + 7 \times 1 = 40 + 7 = 47
    - So, `57` in octal is `47` in decimal.

---

### **Comparison Table**

|**Number System**|**Base**|**Example**|**Decimal Equivalent**|
|---|---|---|---|
|**Binary**|2|`1010`|`10`|
|**Decimal**|10|`45`|`45`|
|**Hexadecimal**|16|`1A3`|`419`|
|**Octal**|8|`57`|`47`|

Each system is used in different computing contexts, such as binary for machine-level operations, hexadecimal for memory addressing, and octal in legacy systems.