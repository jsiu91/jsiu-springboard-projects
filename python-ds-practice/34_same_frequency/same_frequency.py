def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    num1 = [int(d) for d in str(num1)]
    num2 = [int(d) for d in str(num2)]

    num1.sort()
    num2.sort()

    if num1 == num2:
        return True
    return False