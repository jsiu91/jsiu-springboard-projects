def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    # checks = 0
    # for item in lst:
    #     if isinstance(item, list):
    #         checks += 1
    # if checks == len(lst):
    #     return True
    # return False

    for item in lst:
        if not isinstance(item, list):
            return False
    
    return True