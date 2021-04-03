
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({amount: 200000, years: 10, rate: 5})).toEqual('2121.31');
  expect(calculateMonthlyPayment({amount: 300000, years: 15, rate: 3})).toEqual('2071.74');
});


it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({amount: 200000, years: 10, rate: 5})).toBeCloseTo('2121.31',2);
  expect(calculateMonthlyPayment({amount: 300000, years: 15, rate: 3})).toBeCloseTo('2071.74',2);
});

/// etc
