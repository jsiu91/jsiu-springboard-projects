def includes(collection, sought, start=None):
    """Is sought in collection, starting at index start?

    Return True/False if sought is in the given collection:
    - lists/strings/sets/tuples: returns True/False if sought present
    - dictionaries: return True/False if *value* of sought in dictionary

    If string/list/tuple and `start` is provided, starts searching only at that
    index. This `start` is ignored for sets/dictionaries, since they aren't
    ordered.

        >>> includes([1, 2, 3], 1)
        True

        >>> includes([1, 2, 3], 1, 2)
        False

        >>> includes("hello", "o")
        True

        >>> includes(('Elmo', 5, 'red'), 'red', 1)
        True

        >>> includes({1, 2, 3}, 1)
        True

        >>> includes({1, 2, 3}, 1, 3)  # "start" ignored for sets!
        True

        >>> includes({"apple": "red", "berry": "blue"}, "blue")
        True
    """
    # if isinstance(collection, dict): # dict
    #     for val in collection.values():
    #         if val == sought:
    #             return True
    #     return False
    # elif isinstance(collection, set): #set
    #     for val in collection:
    #         if val == sought:
    #             return True
    #     return False
        
    # if start != None:
    #     for i in range(start, len(collection)): #start != None
    #         if collection[i] == sought:
    #             return True
    #     return False

    # if sought in collection:
    #     return True
    # return False

    if isinstance(collection, dict):
        return sought in collection.values()
    
    if start is None or isinstance(collection, set):
        return sought in collection

    return sought in collection[start:]