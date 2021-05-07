"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start=0):
        "Create a start for Serial number."
        self.start = self.next = start
    def generate(self):
        "Generate the number and increase by 1."
        self.next += 1
        return self.next -1

    def reset(self):
        "Reset the number to the initial start value."
        self.next = self.start