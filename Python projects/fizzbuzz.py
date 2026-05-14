def main():
    number= int(input("Number?"))

    if mul35(number):
        print("fizzbuzz")
        while True:
            break

    elif mul3(number):
        print("fizz")

    elif mul5(number):
        print("buzz")
    else:
        print()

def mul3(n) :
    if n % 3 ==0:
        return True
    else:
        return False        
    
def mul5(x) :
    if x % 5 ==0:
        return True
    else:
        return False   
    
def mul35(x) :
    if x % 15 ==0:
        return True
    else:
        return False   
    
main()