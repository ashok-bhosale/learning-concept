Certainly, I'll provide examples of three basic sorting algorithms in C#: bubble sort, selection sort, and insertion sort. These algorithms are simple to understand and implement but are not the most efficient for large datasets.

### Bubble Sort:

Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed.

#### C# Implementation of Bubble Sort:

```csharp
public static void BubbleSort(int[] arr)
{
    int n = arr.Length;
    bool swapped;
    
    do
    {
        swapped = false;
        for (int i = 1; i < n; i++)
        {
            if (arr[i - 1] > arr[i])
            {
                // Swap arr[i-1] and arr[i]
                int temp = arr[i - 1];
                arr[i - 1] = arr[i];
                arr[i] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}
```

#### Usage:

```csharp
int[] data = { 5, 2, 9, 3, 4 };
BubbleSort(data);

Console.WriteLine("Sorted Array:");
foreach (int item in data)
{
    Console.Write(item + " ");
}
```

### Selection Sort:

Selection sort is another simple sorting algorithm that divides the input list into two parts: the sorted part and the unsorted part. It repeatedly selects the smallest element from the unsorted part and moves it to the end of the sorted part.

#### C# Implementation of Selection Sort:

```csharp
public static void SelectionSort(int[] arr)
{
    int n = arr.Length;
    
    for (int i = 0; i < n - 1; i++)
    {
        int minIndex = i;
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[minIndex])
            {
                minIndex = j;
            }
        }
        
        // Swap arr[i] and arr[minIndex]
        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}
```

#### Usage:

```csharp
int[] data = { 5, 2, 9, 3, 4 };
SelectionSort(data);

Console.WriteLine("Sorted Array:");
foreach (int item in data)
{
    Console.Write(item + " ");
}
```

### Insertion Sort:

Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It takes each element from the input data and inserts it into its correct position in the sorted part of the array.

#### C# Implementation of Insertion Sort:

```csharp
public static void InsertionSort(int[] arr)
{
    int n = arr.Length;
    
    for (int i = 1; i < n; i++)
    {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        
        arr[j + 1] = key;
    }
}
```

#### Usage:

```csharp
int[] data = { 5, 2, 9, 3, 4 };
InsertionSort(data);

Console.WriteLine("Sorted Array:");
foreach (int item in data)
{
    Console.Write(item + " ");
}
```

These sorting algorithms are not the most efficient, especially for large datasets. However, they are easy to understand and useful for educational purposes. In practice, you would typically use more efficient sorting algorithms like quicksort or mergesort for larger datasets.