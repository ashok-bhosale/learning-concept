Advanced sorting algorithms like merge sort, quicksort, and heapsort are efficient methods for sorting data. Here, I'll provide you with C# implementations and explanations for each of these sorting algorithms.

### Merge Sort:

Merge sort is a divide-and-conquer sorting algorithm. It divides the input array into two halves, recursively sorts them, and then merges the two sorted halves to produce a single sorted array.

```csharp
public static void MergeSort(int[] arr)
{
    if (arr.Length <= 1)
    {
        return; // Base case: array is already sorted
    }

    int mid = arr.Length / 2;
    int[] left = new int[mid];
    int[] right = new int[arr.Length - mid];

    for (int i = 0; i < mid; i++)
    {
        left[i] = arr[i];
    }
    for (int i = mid; i < arr.Length; i++)
    {
        right[i - mid] = arr[i];
    }

    MergeSort(left);
    MergeSort(right);

    Merge(arr, left, right);
}

private static void Merge(int[] arr, int[] left, int[] right)
{
    int i = 0, j = 0, k = 0;

    while (i < left.Length && j < right.Length)
    {
        if (left[i] <= right[j])
        {
            arr[k] = left[i];
            i++;
        }
        else
        {
            arr[k] = right[j];
            j++;
        }
        k++;
    }

    while (i < left.Length)
    {
        arr[k] = left[i];
        i++;
        k++;
    }

    while (j < right.Length)
    {
        arr[k] = right[j];
        j++;
        k++;
    }
}
```

### Quick Sort:

Quick sort is another divide-and-conquer algorithm that works by selecting a "pivot" element and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. It then recursively sorts the sub-arrays.

```csharp
public static void QuickSort(int[] arr, int low, int high)
{
    if (low < high)
    {
        int pivotIndex = Partition(arr, low, high);
        QuickSort(arr, low, pivotIndex - 1);
        QuickSort(arr, pivotIndex + 1, high);
    }
}

private static int Partition(int[] arr, int low, int high)
{
    int pivot = arr[high];
    int i = (low - 1);

    for (int j = low; j < high; j++)
    {
        if (arr[j] < pivot)
        {
            i++;
            Swap(arr, i, j);
        }
    }

    Swap(arr, i + 1, high);
    return i + 1;
}

private static void Swap(int[] arr, int i, int j)
{
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```

### Heap Sort:

Heap sort is a comparison-based sorting algorithm that converts the input array into a max-heap data structure, and then repeatedly removes the maximum element from the heap and adds it to the sorted portion of the array.

```csharp
public static void HeapSort(int[] arr)
{
    int n = arr.Length;

    // Build a max heap
    for (int i = n / 2 - 1; i >= 0; i--)
    {
        Heapify(arr, n, i);
    }

    // Extract elements one by one
    for (int i = n - 1; i > 0; i--)
    {
        Swap(arr, 0, i); // Move current root to the end
        Heapify(arr, i, 0); // Call max heapify on the reduced heap
    }
}

private static void Heapify(int[] arr, int n, int root)
{
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;

    if (left < n && arr[left] > arr[largest])
    {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest])
    {
        largest = right;
    }

    if (largest != root)
    {
        Swap(arr, root, largest);
        Heapify(arr, n, largest);
    }
}

private static void Swap(int[] arr, int i, int j)
{
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```

These advanced sorting algorithms are more efficient than basic sorting algorithms like bubble sort, selection sort, and insertion sort and are commonly used for large datasets. They have applications in various fields, including data analysis, database systems, and computer graphics.