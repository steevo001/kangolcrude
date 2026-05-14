Starting_balance= int(input("Enter the starting balance: "))
monthly_contribution= int(input("Enter the monthly contribution: "))
Amount_of_years_invested= int(input("Enter the number of years invested: "))
Interest_rate= 0.14

history=[]


Current_balance= Starting_balance

for _ in range(1, Amount_of_years_invested+1):
    Current_balance+= (monthly_contribution * 12)
    Interest_earned= Current_balance * Interest_rate
    Current_balance+= Interest_earned
    history.append(Current_balance)

print(f"In {Amount_of_years_invested} years, your money will have grown to {Current_balance:.2f} at an interest rate of {Interest_rate*100:.2f}%")