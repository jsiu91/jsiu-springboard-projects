def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    count_dict = {}
    for n in nums:
        if n not in count_dict:
            count_dict[n] = 1
        else:
            count_dict[n] += 1
    max_key = max(count_dict, key=count_dict.get)
    return max_key