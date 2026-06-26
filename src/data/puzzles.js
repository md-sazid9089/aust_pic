// Static Puzzle Database for "Spot the Bug"
// Contains exactly 50 puzzles with pre-written plain English explanations
// Distribution: python(13), javascript(13), java(12), cpp(12)
// Difficulty: beginner(13), intermediate(13), advanced(12), expert(12)

export const puzzles = [
  // ─── PYTHON PUZZLES ──────────────────────────────────────────────────────────
  {
    id: "puzzle_001",
    title: "Off by One",
    language: "python",
    difficulty: "beginner",
    category: "loop_error",
    code_snippet: `def sum_list(nums):
    total = 0
    for i in range(len(nums) - 1):
        total += nums[i]
    return total`,
    input_given: "[1, 2, 3, 4, 5]",
    expected_output: "15",
    actual_output: "10",
    bug_type: "off_by_one",
    hint: "Look carefully at where the loop stops.",
    explanation: "The loop stops one step too early! The code uses range(len(nums) - 1), which counts up to index 3 instead of index 4, meaning the last element (5) never gets added. The fix is to change range(len(nums) - 1) to range(len(nums)).",
    correct_keywords: ["range", "boundary", "off by one", "last element", "loop", "index"],
    quick_picks: [
      "The loop stops too early",
      "Wrong math operator used",
      "Variable is undefined",
      "Function returns nothing"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_002",
    title: "Count of Multiples",
    language: "python",
    difficulty: "beginner",
    category: "flipped_condition",
    code_snippet: `def count_evens(nums):
    count = 0
    for n in nums:
        if n % 2 != 0:
            count += 1
    return count`,
    input_given: "[1, 2, 3, 4, 5]",
    expected_output: "2",
    actual_output: "3",
    bug_type: "flipped_condition",
    hint: "Think about what condition represents an even number vs an odd number.",
    explanation: "The condition checks if the remainder is not equal to zero (n % 2 != 0), which actually matches odd numbers. To count evens, we should change the condition to n % 2 == 0.",
    correct_keywords: ["!= 0", "even", "odd", "not equal", "condition is flipped", "% 2"],
    quick_picks: [
      "It checks for odds instead of evens",
      "The count variable resets inside the loop",
      "Loop runs index out of bounds",
      "Numbers are divided by zero"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_003",
    title: "Double the Values",
    language: "python",
    difficulty: "beginner",
    category: "missing_return",
    code_snippet: `def double_array(arr):
    result = []
    for x in arr:
        result.append(x * 2)`,
    input_given: "[1, 2, 3]",
    expected_output: "[2, 4, 6]",
    actual_output: "None",
    bug_type: "missing_return",
    hint: "What happens when a Python function finishes without an explicit return statement?",
    explanation: "The function calculates the doubled values and puts them in 'result', but it forgets to return the array. By default, Python functions return None if there is no return statement.",
    correct_keywords: ["return", "missing return", "result", "forgot to return"],
    quick_picks: [
      "Variable result is out of scope",
      "Missing return statement",
      "The multiplication is wrong",
      "The loop iterates empty lists"
    ],
    correct_quick_pick: 1
  },
  {
    id: "puzzle_004",
    title: "Accumulator Reset",
    language: "python",
    difficulty: "beginner",
    category: "scope_error",
    code_snippet: `def calculate_sum(nums):
    for x in nums:
        total = 0
        total += x
    return total`,
    input_given: "[5, 10, 15]",
    expected_output: "30",
    actual_output: "15",
    bug_type: "scope_error",
    hint: "Where is the total accumulator initialized, and how often does it reset?",
    explanation: "The accumulator variable 'total' is re-initialized to 0 inside the loop on every single iteration. Because of this, it only retains the value of the last number in the list.",
    correct_keywords: ["total = 0", "inside", "reset", "reinitialized", "initialize"],
    quick_picks: [
      "The loop variable is out of range",
      "The variable total is reset inside the loop",
      "Loop only runs once",
      "Addition operator is wrong"
    ],
    correct_quick_pick: 1
  },
  {
    id: "puzzle_005",
    title: "Average Calculator",
    language: "python",
    difficulty: "beginner",
    category: "wrong_operator",
    code_snippet: `def find_average(a, b):
    return a + b / 2`,
    input_given: "a=4, b=8",
    expected_output: "6.0",
    actual_output: "8.0",
    bug_type: "wrong_operator",
    hint: "Check order of operations (operator precedence).",
    explanation: "Division has higher precedence than addition, so only 'b' is divided by 2. The formula should use parentheses: (a + b) / 2.",
    correct_keywords: ["parentheses", "precedence", "brackets", "(a + b)", "order of operations"],
    quick_picks: [
      "b is divided before adding a",
      "Integer division occurred",
      "The variable names are swapped",
      "Division by zero"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_006",
    title: "Grade Threshold",
    language: "python",
    difficulty: "intermediate",
    category: "flipped_condition",
    code_snippet: `def is_passing(score):
    if score < 60:
        return False
    else:
        return False`,
    input_given: "75",
    expected_output: "True",
    actual_output: "False",
    bug_type: "flipped_condition",
    hint: "Check what is returned in both branches of the conditional statement.",
    explanation: "Both branches return False! The 'else' block should return True so that scores 60 and above are marked as passing.",
    correct_keywords: ["else", "return false", "return true", "both return", "duplicate return"],
    quick_picks: [
      "The if condition has a syntax error",
      "Both branches return False",
      "Score is compared as a string",
      "The function does not run"
    ],
    correct_quick_pick: 1
  },
  {
    id: "puzzle_007",
    title: "Duplicate Finder",
    language: "python",
    difficulty: "intermediate",
    category: "wrong_variable",
    code_snippet: `def has_duplicates(items):
    seen = set()
    for item in items:
        if item in items:
            return True
        seen.add(item)
    return False`,
    input_given: "['apple', 'banana', 'orange']",
    expected_output: "False",
    actual_output: "True",
    bug_type: "wrong_variable",
    hint: "What collection should we search to see if we have encountered the item before?",
    explanation: "The code checks if the item is in 'items' (the input list) rather than checking the 'seen' set. Since every item is naturally in the input list, it immediately flags a duplicate on the first item.",
    correct_keywords: ["seen", "items", "set", "collection", "in items", "check seen"],
    quick_picks: [
      "It checks items instead of seen set",
      "Set is not initialized correctly",
      "The item variable is out of scope",
      "List indexes are compared incorrectly"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_008",
    title: "Infinite Countdown",
    language: "python",
    difficulty: "intermediate",
    category: "infinite_loop",
    code_snippet: `def countdown(start):
    res = []
    while start > 0:
        res.append(start)
        # countdown decrement missing
    return res`,
    input_given: "3",
    expected_output: "[3, 2, 1]",
    actual_output: "Infinite Loop",
    bug_type: "infinite_loop",
    hint: "Does the loop variable modify over time?",
    explanation: "The code lacks a decrement statement (start -= 1) inside the loop. The variable 'start' remains greater than 0 forever, creating an infinite loop.",
    correct_keywords: ["decrement", "start -= 1", "subtract", "minus", "change start"],
    quick_picks: [
      "The countdown variable is not updated",
      "Loop condition is backwards",
      "Result is not returned",
      "Integer subtraction is not supported"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_009",
    title: "User Profile Default",
    language: "python",
    difficulty: "intermediate",
    category: "null_check",
    code_snippet: `def get_username(profile):
    # profile can be None
    return profile["name"]`,
    input_given: "None",
    expected_output: "'Guest'",
    actual_output: "TypeError: 'NoneType' object is not subscriptable",
    bug_type: "null_check",
    hint: "Look at what happens if profile is None.",
    explanation: "The code tries to look up 'name' on the 'profile' dictionary without verifying if the profile itself is None. We need to check if profile is None first.",
    correct_keywords: ["none", "null", "check profile", "subscriptable", "dictionary access"],
    quick_picks: [
      "It doesn't check if profile is None first",
      "The key 'name' does not exist",
      "Profile is a string object",
      "A return statement is missing"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_010",
    title: "Float Division Error",
    language: "python",
    difficulty: "intermediate",
    category: "integer_division",
    code_snippet: `def split_bill(total, people):
    # expects division representation
    return total // people`,
    input_given: "total=25, people=4",
    expected_output: "6.25",
    actual_output: "6",
    bug_type: "integer_division",
    hint: "Notice the difference between double slash (//) and single slash (/) operators in Python.",
    explanation: "The code uses '//' which performs integer (floor) division, truncating the decimals. To get a decimal remainder, we must use '/' for floating-point division.",
    correct_keywords: ["floor", "integer division", "//", "single slash", "/"],
    quick_picks: [
      "Double slash performs integer division",
      "Division by float is invalid",
      "Syntax uses wrong divide order",
      "Variable people is zero"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_011",
    title: "Global State Modifier",
    language: "python",
    difficulty: "advanced",
    category: "scope_error",
    code_snippet: `exchange_rate = 1.2

def update_rate(new_rate):
    exchange_rate = new_rate

update_rate(1.5)`,
    input_given: "Check exchange_rate value after run",
    expected_output: "1.5",
    actual_output: "1.2",
    bug_type: "scope_error",
    hint: "How does Python distinguish between local and global variables inside functions?",
    explanation: "Inside the function, Python treats 'exchange_rate' as a new local variable because it is assigned directly. To modify the global variable, we must declare 'global exchange_rate' inside the function.",
    correct_keywords: ["global", "scope", "local variable", "shadowing", "declare global"],
    quick_picks: [
      "The variable should be declared global",
      "Exchange rate variable is immutable",
      "Functions cannot modify variables",
      "The parameter variable is incorrect"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_012",
    title: "Dictionary Default Values",
    language: "python",
    difficulty: "advanced",
    category: "null_check",
    code_snippet: `def add_grade(student, grades={}):
    grades[student] = "A"
    return grades`,
    input_given: "add_grade('Alice') then add_grade('Bob')",
    expected_output: "Bob's call returns {'Bob': 'A'}",
    actual_output: "{'Alice': 'A', 'Bob': 'A'}",
    bug_type: "null_check",
    hint: "What happens when you use a mutable default parameter like a dictionary in Python?",
    explanation: "In Python, default arguments are evaluated once when the function is defined. Passing a mutable dictionary {} as a default means every function call shares the same dictionary instance.",
    correct_keywords: ["mutable default", "mutable", "shared dictionary", "evaluated once", "default argument"],
    quick_picks: [
      "Default arguments are shared across calls",
      "Values are overwritten immediately",
      "Key lookup is failing on student",
      "Static dictionaries are immutable"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_013",
    title: "List Pop Index",
    language: "python",
    difficulty: "advanced",
    category: "index_out_of_bounds",
    code_snippet: `def remove_last(items):
    # removes the last element
    items.pop(len(items))
    return items`,
    input_given: "[10, 20, 30]",
    expected_output: "[10, 20]",
    actual_output: "IndexError: pop index out of range",
    bug_type: "index_out_of_bounds",
    hint: "Think about index bounds. If list has length 3, what are the valid indices?",
    explanation: "Indices in Python are 0-indexed, meaning a list of length 3 has indices 0, 1, and 2. Calling pop(len(items)) requests index 3, which is out of bounds. The last index is len(items) - 1, or simply pop() with no index.",
    correct_keywords: ["len(items) - 1", "out of bounds", "index error", "0-indexed", "pop()"],
    quick_picks: [
      "Index should be len(items) - 1",
      "pop requires no arguments",
      "Lists are immutable in this context",
      "Index out of bounds due to negative steps"
    ],
    correct_quick_pick: 0
  },

  // ─── JAVASCRIPT PUZZLES ──────────────────────────────────────────────────────
  {
    id: "puzzle_014",
    title: "Type Coercion",
    language: "javascript",
    difficulty: "beginner",
    category: "type_mismatch",
    code_snippet: `function calculateTotal(price, tax) {
  return price + tax;
}`,
    input_given: "price='10', tax=5",
    expected_output: "15",
    actual_output: "'105'",
    bug_type: "type_mismatch",
    hint: "Check the data types of the parameters being passed to the addition operator.",
    explanation: "Since the price is passed as a string ('10'), JavaScript performs string concatenation instead of mathematical addition. To fix this, we should parse the string using Number(price) or parseFloat(price).",
    correct_keywords: ["string concatenation", "coercion", "number", "parsefloat", "parseint", "string"],
    quick_picks: [
      "String concatenation overrides addition",
      "Syntax error in return parameters",
      "Tax variable was not defined",
      "Numbers cannot be parsed by default"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_015",
    title: "Equality Check Confusion",
    language: "javascript",
    difficulty: "beginner",
    category: "wrong_operator",
    code_snippet: `function checkStatus(status) {
  if (status = "active") {
    return "Proceed";
  }
  return "Stop";
}`,
    input_given: "'inactive'",
    expected_output: "'Stop'",
    actual_output: "'Proceed'",
    bug_type: "wrong_operator",
    hint: "Look at the operator inside the 'if' condition statement.",
    explanation: "The condition uses a single equal sign (=), which performs an assignment instead of a comparison. Since 'active' is a truthy value, the condition always evaluates to true. Change status = 'active' to status === 'active'.",
    correct_keywords: ["assignment", "single equals", "==", "===", "comparison"],
    quick_picks: [
      "Assignment (=) is used instead of comparison (===)",
      "Variable name status is invalid",
      "JavaScript always returns proceed",
      "Syntax lacks brackets"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_016",
    title: "Array Reference Equality",
    language: "javascript",
    difficulty: "beginner",
    category: "type_mismatch",
    code_snippet: `function isEmpty(arr) {
  return arr === [];
}`,
    input_given: "[]",
    expected_output: "true",
    actual_output: "false",
    bug_type: "type_mismatch",
    hint: "How does JavaScript compare arrays or objects for equality?",
    explanation: "In JavaScript, arrays are objects, and comparing them with '===' checks if they reference the exact same object in memory, not if their values are identical. To check if an array is empty, use arr.length === 0.",
    correct_keywords: ["reference", "memory", "length == 0", "length ===", "address", "compare object"],
    quick_picks: [
      "Comparing array references instead of checking length",
      "Triple equals is invalid on arrays",
      "The brackets are not initialized",
      "Arrays are null objects by default"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_017",
    title: "Object Property Access",
    language: "javascript",
    difficulty: "beginner",
    category: "wrong_variable",
    code_snippet: `function getUserAge(user) {
  return user.Age;
}`,
    input_given: "{ name: 'John', age: 30 }",
    expected_output: "30",
    actual_output: "undefined",
    bug_type: "wrong_variable",
    hint: "Case sensitivity matters in object property keys.",
    explanation: "JavaScript is case-sensitive! The input object defines the property 'age' with a lowercase 'a', but the function tries to access it using an uppercase 'Age'.",
    correct_keywords: ["case-sensitive", "case sensitive", "uppercase", "lowercase", "age vs Age"],
    quick_picks: [
      "Property name has wrong capitalization",
      "The age property is private",
      "JavaScript cannot access object attributes directly",
      "User variable is out of scope"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_018",
    title: "Variable Shadowing",
    language: "javascript",
    difficulty: "intermediate",
    category: "scope_error",
    code_snippet: `let user = "admin";
function login() {
  let user = "guest";
}
login();`,
    input_given: "Value of user after login()",
    expected_output: "'guest'",
    actual_output: "'admin'",
    bug_type: "scope_error",
    hint: "Look at the 'let' keyword inside the 'login' function.",
    explanation: "The 'login' function declares a new local variable named 'user' inside its scope using 'let'. This shadows the global 'user' variable rather than modifying it. To modify the global variable, remove 'let' inside the function.",
    correct_keywords: ["shadowing", "shadow", "let keyword", "re-declared", "local vs global"],
    quick_picks: [
      "The variable is re-declared locally shadowing the global one",
      "Let variables are always read-only",
      "The function does not run on execution",
      "Global variables are protected"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_019",
    title: "Array Map Callback",
    language: "javascript",
    difficulty: "intermediate",
    category: "missing_return",
    code_snippet: `function squareAll(arr) {
  return arr.map(x => {
    x * x;
  });
}`,
    input_given: "[1, 2, 3]",
    expected_output: "[1, 4, 9]",
    actual_output: "[undefined, undefined, undefined]",
    bug_type: "missing_return",
    hint: "Look at the braces in the arrow function. Does the function return a value?",
    explanation: "When you use curly braces '{ ... }' in an arrow function, it creates a block body, meaning you must write an explicit 'return' statement. Either add 'return x * x;' or remove the curly braces for an implicit return.",
    correct_keywords: ["curly braces", "braces", "implicit return", "arrow function", "map return"],
    quick_picks: [
      "The arrow function block body lacks a return statement",
      "Array map does not modify array values",
      "Multiplication is not supported in map functions",
      "Variable x is out of scope"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_020",
    title: "Callback Asynchrony",
    language: "javascript",
    difficulty: "intermediate",
    category: "flipped_condition",
    code_snippet: `function getData() {
  let data = "loading";
  setTimeout(() => {
    data = "done";
  }, 1000);
  return data;
}`,
    input_given: "getData()",
    expected_output: "'done'",
    actual_output: "'loading'",
    bug_type: "flipped_condition",
    hint: "Does the return statement wait for the timer to complete?",
    explanation: "The return statement runs synchronously, meaning it returns 'data' immediately before the asynchronous 'setTimeout' callback has a chance to execute. We should use Promises or async/await.",
    correct_keywords: ["asynchronous", "async", "synchronous", "promise", "settimeout", "timer", "immediately"],
    quick_picks: [
      "Function returns before the async timeout executes",
      "Timeout timer is too long",
      "Timeout block fails silently",
      "Data variable should be const"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_021",
    title: "Float Calculation Precision",
    language: "javascript",
    difficulty: "intermediate",
    category: "type_mismatch",
    code_snippet: `function isNearlyEqual(a, b) {
  return (0.1 + 0.2) === 0.3;
}`,
    input_given: "None",
    expected_output: "true",
    actual_output: "false",
    bug_type: "type_mismatch",
    hint: "Computers use binary floating-point representation, which can cause tiny rounding anomalies.",
    explanation: "JavaScript floating-point numbers can suffer from rounding errors. In binary, 0.1 + 0.2 actually equals 0.30000000000000004, making it unequal to 0.3. A solution is to check if the difference is smaller than a tiny tolerance.",
    correct_keywords: ["floating point", "precision", "rounding", "0.300000000", "float math", "binary representation"],
    quick_picks: [
      "Floating point math creates minor precision errors",
      "Triple equals checks wrong data type",
      "Brackets are evaluated in wrong order",
      "Math library is missing"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_022",
    title: "Find Last Index",
    language: "javascript",
    difficulty: "intermediate",
    category: "off_by_one",
    code_snippet: `function getLastItem(arr) {
  return arr[arr.length];
}`,
    input_given: "['a', 'b', 'c']",
    expected_output: "'c'",
    actual_output: "undefined",
    bug_type: "off_by_one",
    hint: "If an array has length 3, what is the index of the last element?",
    explanation: "Arrays are 0-indexed, which means a list of length 3 has elements at indices 0, 1, and 2. Using arr.length accesses index 3, which doesn't exist and returns undefined. The correct index is arr.length - 1.",
    correct_keywords: ["length - 1", "0-indexed", "index offset", "last element"],
    quick_picks: [
      "Index should be arr.length - 1",
      "Length property is undefined",
      "Arrays must be accessed from 1",
      "Negative index missing"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_023",
    title: "Array Filter Accumulation",
    language: "javascript",
    difficulty: "advanced",
    category: "missing_return",
    code_snippet: `function removeNegatives(arr) {
  return arr.filter(x => {
    x >= 0;
  });
}`,
    input_given: "[-1, 2, -3, 4]",
    expected_output: "[2, 4]",
    actual_output: "[]",
    bug_type: "missing_return",
    hint: "What does the filter callback block return?",
    explanation: "Because curly braces '{ ... }' are used, the arrow function requires a return statement. Since nothing is returned, it defaults to returning undefined, which is a falsy value, causing filter to discard every element.",
    correct_keywords: ["curly braces", "no return", "filter callback", "implicit return", "falsy"],
    quick_picks: [
      "The filter callback lacks an explicit return statement",
      "Filter function does not return a new array",
      "Condition is wrong for negative integers",
      "Filter only supports loops"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_024",
    title: "Closure Variables",
    language: "javascript",
    difficulty: "advanced",
    category: "scope_error",
    code_snippet: `function buildCounters() {
  var list = [];
  for (var i = 0; i < 3; i++) {
    list.push(() => i);
  }
  return list;
}`,
    input_given: "Calling the first function in returned list",
    expected_output: "0",
    actual_output: "3",
    bug_type: "scope_error",
    hint: "How does the var keyword affect block scoping inside loops?",
    explanation: "Because 'var' does not have block scope, all closures bind to the exact same 'i' variable instance. By the time the loop ends, 'i' equals 3. Using 'let' instead of 'var' creates a unique binding for each loop iteration.",
    correct_keywords: ["var keyword", "var vs let", "block scope", "closure binding", "closures"],
    quick_picks: [
      "var variables lack block scope and share one binding",
      "Closure variables are read-only",
      "The push function fails internally",
      "Indexes must start from negative values"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_025",
    title: "Undefined Object Keys",
    language: "javascript",
    difficulty: "advanced",
    category: "null_check",
    code_snippet: `function capitalizeCity(user) {
  return user.address.city.toUpperCase();
}`,
    input_given: "{ name: 'Alice' }",
    expected_output: "Throw error gracefully or return 'Unknown'",
    actual_output: "TypeError: Cannot read properties of undefined (reading 'city')",
    bug_type: "null_check",
    hint: "What happens when you traverse a nested object path when a parent key is missing?",
    explanation: "The object does not contain an 'address' property, so 'user.address' evaluates to undefined. Accessing 'city' on undefined triggers a TypeError. The fix is to check optional chaining (user.address?.city).",
    correct_keywords: ["optional chaining", "nested object", "cannot read properties", "undefined city", "missing parent"],
    quick_picks: [
      "Cannot read properties of undefined properties",
      "Capitalization should be done inside methods",
      "Keys are case sensitive in arrays",
      "Functions cannot format strings"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_026",
    title: "Null Coalescing Confusion",
    language: "javascript",
    difficulty: "advanced",
    category: "flipped_condition",
    code_snippet: `function getSettings(config) {
  // uses default if disabled is null/undefined
  return config.disabled || true;
}`,
    input_given: "{ disabled: false }",
    expected_output: "false",
    actual_output: "true",
    bug_type: "flipped_condition",
    hint: "What operator should be used if we only want to fallback on null/undefined, but allow falsy values like false or 0?",
    explanation: "The logical OR operator (||) checks for truthy values, so it treats 'false' as false and falls back to 'true'. To allow valid falsy values like false or 0, we must use the nullish coalescing operator (??) instead.",
    correct_keywords: ["nullish coalescing", "??", "logical OR", "falsy", "fallback"],
    quick_picks: [
      "Logical OR operator treats false as a trigger for fallback",
      "Config is not defined properly",
      "The value false cannot be coerced",
      "Double pipes operator has syntax errors"
    ],
    correct_quick_pick: 0
  },

  // ─── JAVA PUZZLES ────────────────────────────────────────────────────────────
  {
    id: "puzzle_027",
    title: "Java String Equality",
    language: "java",
    difficulty: "beginner",
    category: "string_comparison",
    code_snippet: `public boolean checkPassword(String input) {
    if (input == "secret") {
        return true;
    }
    return false;
}`,
    input_given: "new String('secret')",
    expected_output: "true",
    actual_output: "false",
    bug_type: "string_comparison",
    hint: "How are strings compared in Java? What is the difference between == and .equals()?",
    explanation: "In Java, the '==' operator compares object reference addresses in memory, not the content of strings. To compare string values, use input.equals('secret') instead.",
    correct_keywords: ["equals()", "string comparison", "reference comparison", "=="],
    quick_picks: [
      "The == operator compares reference addresses, not content",
      "String parameters must be in single quotes",
      "Java does not allow comparison in conditional statement",
      "Return statements require uppercase"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_028",
    title: "Integer Division Truncation",
    language: "java",
    difficulty: "beginner",
    category: "integer_division",
    code_snippet: `public double getRatio() {
    double ratio = 5 / 2;
    return ratio;
}`,
    input_given: "None",
    expected_output: "2.5",
    actual_output: "2.0",
    bug_type: "integer_division",
    hint: "What is the data type of the numbers in the division statement?",
    explanation: "Both 5 and 2 are integers, so Java performs integer division first, yielding 2. Only after the division is finished is the result cast to a double (2.0). To fix this, use 5.0 / 2 or 5 / 2.0.",
    correct_keywords: ["integer division", "fractional", "double cast", "decimal truncate"],
    quick_picks: [
      "Division on integers discards fractional remainders",
      "Ratio variable should be integer type",
      "Result overflows integer boundaries",
      "Ratio calculations must use math library"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_029",
    title: "Array Boundary Index",
    language: "java",
    difficulty: "beginner",
    category: "index_out_of_bounds",
    code_snippet: `public int getFirstElement(int[] nums) {
    return nums[1];
}`,
    input_given: "[9, 8, 7]",
    expected_output: "9",
    actual_output: "8",
    bug_type: "index_out_of_bounds",
    hint: "What index corresponds to the very first item in an array?",
    explanation: "Java arrays are 0-indexed, meaning the first element is at index 0. Accessing index 1 returns the second element instead. The fix is to use nums[0].",
    correct_keywords: ["0-indexed", "index 0", "first element", "nums[0]"],
    quick_picks: [
      "Arrays are 0-indexed, so index 0 is first",
      "First index is 1 in Java",
      "Array lacks elements",
      "Syntax lacks brackets"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_030",
    title: "Null Pointer Risk",
    language: "java",
    difficulty: "beginner",
    category: "null_check",
    code_snippet: `public int getStringLength(String str) {
    return str.length();
}`,
    input_given: "null",
    expected_output: "-1 or error handling",
    actual_output: "NullPointerException",
    bug_type: "null_check",
    hint: "What happens when you call a method on a null reference?",
    explanation: "If the input string 'str' is null, calling str.length() throws a NullPointerException. A safety check (str == null) should be added to handle null arguments.",
    correct_keywords: ["null pointer", "null check", "str == null", "pointer exception"],
    quick_picks: [
      "No null check, throws NullPointerException",
      "Method length requires brackets",
      "Null values are not strings",
      "Return statements cannot return integers"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_031",
    title: "Accidental Semicolon",
    language: "java",
    difficulty: "intermediate",
    category: "loop_error",
    code_snippet: `public int sumToFive() {
    int sum = 0;
    for (int i = 1; i <= 5; i++); {
        sum += i;
    }
    return sum;
}`,
    input_given: "None",
    expected_output: "15",
    actual_output: "Compilation error: cannot find symbol i",
    bug_type: "loop_error",
    hint: "Look closely at the characters at the end of the 'for' loop declaration statement.",
    explanation: "There is an accidental semicolon (;) at the end of the 'for' statement line. This terminates the loop immediately, meaning the block that follows runs only once and cannot access the loop variable 'i'.",
    correct_keywords: ["semicolon", "loop termination", "symbol i", "for loop end"],
    quick_picks: [
      "Accidental semicolon after the loop header",
      "Braces are incorrectly nested",
      "The variable i is out of scope",
      "Sum calculation is wrong"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_032",
    title: "Java Char Concatenation",
    language: "java",
    difficulty: "intermediate",
    category: "type_mismatch",
    code_snippet: `public String combine() {
    return 'A' + 'B';
}`,
    input_given: "None",
    expected_output: "'AB'",
    actual_output: "131",
    bug_type: "type_mismatch",
    hint: "Are these characters string literals or char literals?",
    explanation: "Single quotes represent 'char' literals in Java. When added, their numeric ASCII values are summed (65 + 66 = 131). To concatenate them as text, use double quotes for string literals: \"A\" + \"B\".",
    correct_keywords: ["ascii", "char literal", "single quote", "double quote", "numeric value"],
    quick_picks: [
      "Char literals sum their ASCII values instead of concatenating",
      "Java does not support char addition",
      "Return value type should be char",
      "Single quotes are invalid in Java"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_033",
    title: "Accidental Fallthrough",
    language: "java",
    difficulty: "intermediate",
    category: "flipped_condition",
    code_snippet: `public String getDayType(int day) {
    String type = "";
    switch(day) {
        case 1: type = "Weekend";
        case 2: type = "Weekday";
        default: type = "Invalid";
    }
    return type;
}`,
    input_given: "1",
    expected_output: "'Weekend'",
    actual_output: "'Invalid'",
    bug_type: "flipped_condition",
    hint: "What happens when a switch case block does not have a break statement?",
    explanation: "The switch block lacks 'break' statements. This causes case execution to fall through, executing subsequent cases and the default block, overwriting the result with 'Invalid'. Add 'break;' to each case.",
    correct_keywords: ["fallthrough", "break statement", "missing break", "switch statement"],
    quick_picks: [
      "Switch cases lack break statements",
      "Type variable is re-initialized",
      "Default statement runs first",
      "Semicolons are missing"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_034",
    title: "Infinite While Loop",
    language: "java",
    difficulty: "intermediate",
    category: "infinite_loop",
    code_snippet: `public void loopCount() {
    int i = 0;
    while (i < 5) {
        System.out.print(i);
        // decrement instead of increment
        i--;
    }
}`,
    input_given: "loopCount()",
    expected_output: "Prints 01234",
    actual_output: "Infinite Loop",
    bug_type: "infinite_loop",
    hint: "What direction is the loop variable modifying?",
    explanation: "The loop variable is decremented (i--) instead of incremented (i++). Since 'i' starts at 0 and goes down, the condition 'i < 5' will always be true, causing an infinite loop.",
    correct_keywords: ["decrement", "decrementing", "i--", "increment", "infinite loop"],
    quick_picks: [
      "The variable is decremented instead of incremented",
      "The loop condition should be positive",
      "Integer type is too small",
      "System print statement is wrong"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_035",
    title: "Wrong Increment Priority",
    language: "java",
    difficulty: "advanced",
    category: "wrong_operator",
    code_snippet: `public int incrementTotal() {
    int count = 0;
    count = count++;
    return count;
}`,
    input_given: "None",
    expected_output: "1",
    actual_output: "0",
    bug_type: "wrong_operator",
    hint: "What is the difference between prefix (++count) and postfix (count++) operators during assignment?",
    explanation: "The postfix operator (count++) returns the original value before incrementing. Assigning it back to 'count' overwrites the incremented value with the original 0. Use prefix (++count) or just count++ without assignment.",
    correct_keywords: ["postfix", "prefix", "evaluation order", "assigned", "post-increment"],
    quick_picks: [
      "Postfix operator returns original value before increment",
      "Assignments override arithmetic",
      "Int variables are read-only in assignment",
      "Operator precedence requires parentheses"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_036",
    title: "Collection Remove Trap",
    language: "java",
    difficulty: "advanced",
    category: "index_out_of_bounds",
    code_snippet: `public List<Integer> removeElement(List<Integer> list) {
    list.remove(2); // expect removing value 2
    return list;
}`,
    input_given: "List: [5, 4, 2, 1]",
    expected_output: "[5, 4, 1]",
    actual_output: "[5, 4, 2]",
    bug_type: "index_out_of_bounds",
    hint: "List.remove has two overloaded versions: one for index, one for object. Which one is called here?",
    explanation: "In Java, calling remove(int) on a list of Integers resolves to removing the element at index 2 rather than the object value 2. To remove the object, cast it: list.remove(Integer.valueOf(2)).",
    correct_keywords: ["overloaded", "index vs value", "remove(int)", "valueof", "index 2"],
    quick_picks: [
      "remove(int) treats the argument as an index rather than a value",
      "The value 2 is not in the list",
      "Java lists are immutable by default",
      "Index out of bounds occurs on length"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_037",
    title: "Substring Index Limit",
    language: "java",
    difficulty: "advanced",
    category: "off_by_one",
    code_snippet: `public String getFirstThree(String str) {
    return str.substring(0, 2);
}`,
    input_given: "'abcdef'",
    expected_output: "'abc'",
    actual_output: "'ab'",
    bug_type: "off_by_one",
    hint: "Does the second argument in String.substring include or exclude that index?",
    explanation: "In Java, the ending index in substring(start, end) is exclusive. To retrieve characters at indices 0, 1, and 2 (length 3), the ending index must be specified as 3 (str.substring(0, 3)).",
    correct_keywords: ["exclusive", "exclusive index", "substring", "ending index"],
    quick_picks: [
      "Substring end index is exclusive, should be 3",
      "Substring starts from index 1",
      "Length of substring is limited",
      "Parameters are in wrong order"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_038",
    title: "Java Compare Objects",
    language: "java",
    difficulty: "expert",
    category: "string_comparison",
    code_snippet: `public boolean compareIds(Integer id1, Integer id2) {
    return id1 == id2;
}`,
    input_given: "id1=200, id2=200",
    expected_output: "true",
    actual_output: "false",
    bug_type: "string_comparison",
    hint: "Does Java cache Integer objects? What happens outside the cached range (-128 to 127)?",
    explanation: "Java caches Integer objects for values between -128 and 127, where '==' works. For values outside this range, new Integer objects are created, and '==' checks reference equality. Use id1.equals(id2).",
    correct_keywords: ["integer cache", "equals()", "cached range", "-128", "127", "reference equality"],
    quick_picks: [
      "Integers outside cached range (-128 to 127) have separate references",
      "Double equals fails on wrapper types",
      "Integer type overflows quickly",
      "Equal checks are invalid for reference numbers"
    ],
    correct_quick_pick: 0
  },

  // ─── C++ PUZZLES ─────────────────────────────────────────────────────────────
  {
    id: "puzzle_039",
    title: "Integer Division Cast",
    language: "cpp",
    difficulty: "beginner",
    category: "integer_division",
    code_snippet: `float getPercentage(int correct, int total) {
    return (correct / total) * 100;
}`,
    input_given: "correct=4, total=5",
    expected_output: "80.0",
    actual_output: "0.0",
    bug_type: "integer_division",
    hint: "What happens when you divide two integers in C++ before multiplying by 100?",
    explanation: "The division correct / total is performed as integer division, which discards the remainder (4/5 = 0). Multiplying by 100 yields 0. To fix, cast one operand: (float)correct / total.",
    correct_keywords: ["integer division", "truncate", "cast", "float", "double"],
    quick_picks: [
      "Division on integers yields 0 before multiplication",
      "Percentage math is wrong",
      "Total variable is zero",
      "Float conversions are prohibited"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_040",
    title: "Uninitialized Local",
    language: "cpp",
    difficulty: "beginner",
    category: "null_check",
    code_snippet: `int getSum(int limit) {
    int total;
    for (int i = 0; i < limit; ++i) {
        total += i;
    }
    return total;
}`,
    input_given: "limit=3",
    expected_output: "3",
    actual_output: "Garbage value",
    bug_type: "null_check",
    hint: "What value does the variable 'total' hold when first declared in C++?",
    explanation: "In C++, local variables are not automatically initialized to zero. The variable 'total' contains a random garbage memory value, producing a garbage result. Initialize it using: int total = 0;",
    correct_keywords: ["uninitialized", "garbage value", "garbage", "initialize to 0", "undefined behavior"],
    quick_picks: [
      "Variable total is not initialized and holds garbage value",
      "The loop iterates past boundary limits",
      "Loop index starts from negative numbers",
      "Function parameter is read-only"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_041",
    title: "Out of Bounds Access",
    language: "cpp",
    difficulty: "beginner",
    category: "index_out_of_bounds",
    code_snippet: `int getElement(int arr[], int size) {
    return arr[size];
}`,
    input_given: "arr=[10, 20, 30], size=3",
    expected_output: "Index out of bounds check or error",
    actual_output: "Garbage value (undefined behavior)",
    bug_type: "index_out_of_bounds",
    hint: "Think about array indexing bounds.",
    explanation: "In C++, arrays are 0-indexed, so an array of size 3 has valid indices 0, 1, and 2. Accessing index 3 (arr[size]) reads memory past the array boundary, causing undefined behavior.",
    correct_keywords: ["0-indexed", "index size", "out of bounds", "out of range", "index size - 1"],
    quick_picks: [
      "Accesses index past array bounds (size instead of size - 1)",
      "Array length property is missing",
      "Zero index checks are failing",
      "C++ arrays start at index 1"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_042",
    title: "Accidental Assignment",
    language: "cpp",
    difficulty: "beginner",
    category: "wrong_operator",
    code_snippet: `bool verifyLevel(int level) {
    if (level = 10) {
        return true;
    }
    return false;
}`,
    input_given: "level=5",
    expected_output: "false",
    actual_output: "true",
    bug_type: "wrong_operator",
    hint: "Check the assignment vs equality operator in the conditional statement.",
    explanation: "The conditional uses a single equals sign (=), assigning 10 to 'level'. Since 10 is non-zero (true), the condition always evaluates to true. Use '==' for comparison.",
    correct_keywords: ["assignment", "single equals", "==", "comparison operator"],
    quick_picks: [
      "Single equals assigns value instead of comparing",
      "Function parameter scope is wrong",
      "Variable name level is protected",
      "Boolean returns require braces"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_043",
    title: "C-Style String Comparison",
    language: "cpp",
    difficulty: "intermediate",
    category: "string_comparison",
    code_snippet: `bool checkAccess(char* key) {
    if (key == "open") {
        return true;
    }
    return false;
}`,
    input_given: "key='open'",
    expected_output: "true",
    actual_output: "false",
    bug_type: "string_comparison",
    hint: "How are C-style character arrays compared in C++? Does '==' compare text or pointer addresses?",
    explanation: "Using '==' on char pointers compares their memory addresses rather than the string text content. To compare C-style strings, use the 'strcmp' function or convert the pointer to 'std::string'.",
    correct_keywords: ["strcmp", "pointer comparison", "std::string", "char pointer", "addresses"],
    quick_picks: [
      "Compares pointer memory addresses instead of string text",
      "String parameters must be double quoted",
      "The key pointer is uninitialized",
      "Return value type should be integer"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_044",
    title: "Double Delete",
    language: "cpp",
    difficulty: "intermediate",
    category: "null_check",
    code_snippet: `void cleanup(int* ptr) {
    delete ptr;
    // missing null assignment
    delete ptr;
}`,
    input_given: "Valid pointer ptr",
    expected_output: "No crash / safe cleanup",
    actual_output: "Segmentation fault / double free error",
    bug_type: "null_check",
    hint: "What happens when you delete the same memory address twice?",
    explanation: "Deleting an already deleted pointer causes a 'double free' error. After deleting a pointer, it should be set to nullptr because deleting nullptr is safe in C++.",
    correct_keywords: ["double delete", "double free", "nullptr", "null pointer", "crash", "segmentation fault"],
    quick_picks: [
      "Deleting the same memory pointer twice triggers double free crash",
      "Delete operator requires parentheses",
      "System lacks dynamic memory",
      "Pointer address is out of bounds"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_045",
    title: "Pass by Value Copy",
    language: "cpp",
    difficulty: "intermediate",
    category: "scope_error",
    code_snippet: `void increment(int x) {
    x += 1;
}`,
    input_given: "int val = 5; increment(val); val value",
    expected_output: "6",
    actual_output: "5",
    bug_type: "scope_error",
    hint: "Is the variable passed by value or passed by reference?",
    explanation: "The function accepts the parameter 'x' by value, which means it modifies a copy of the argument rather than the original variable. To modify the original variable, change parameter to 'int& x' (pass by reference).",
    correct_keywords: ["by value", "by reference", "copy", "int&", "reference parameter"],
    quick_picks: [
      "Passed by value (copy) instead of by reference (int&)",
      "Increment operator is invalid in functions",
      "Scope of variable val is protected",
      "Function lacks return keyword"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_046",
    title: "Vector Iterator Invalidation",
    language: "cpp",
    difficulty: "advanced",
    category: "index_out_of_bounds",
    code_snippet: `void removeEvens(std::vector<int>& vec) {
    for (auto it = vec.begin(); it != vec.end(); ++it) {
        if (*it % 2 == 0) {
            vec.erase(it);
        }
    }
}`,
    input_given: "vec=[1, 2, 3, 4]",
    expected_output: "[1, 3]",
    actual_output: "Runtime error / Undefined behavior",
    bug_type: "index_out_of_bounds",
    hint: "What happens to C++ vector iterators when you call erase() during iteration?",
    explanation: "Erasing an element from a vector invalidates all iterators at and after the erased element, leading to undefined behavior when the loop increments 'it'. The loop should use the iterator returned by erase: it = vec.erase(it).",
    correct_keywords: ["iterator invalidation", "erase iterator", "erase() returns", "invalidated"],
    quick_picks: [
      "Erasing elements invalidates vector iterators during loop",
      "Vector elements cannot be deleted dynamically",
      "Loop condition index is out of bounds",
      "Modulo calculation is wrong"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_047",
    title: "Dangling Pointer",
    language: "cpp",
    difficulty: "advanced",
    category: "scope_error",
    code_snippet: `int* getLocalPointer() {
    int x = 42;
    return &x;
}`,
    input_given: "Dereferencing the returned pointer",
    expected_output: "42",
    actual_output: "Garbage value (undefined behavior)",
    bug_type: "scope_error",
    hint: "What is the lifetime of a local variable declared inside a function?",
    explanation: "Variable 'x' is a local stack variable that gets destroyed when the function returns. The returned pointer points to a deallocated stack frame, resulting in a dangling pointer.",
    correct_keywords: ["dangling pointer", "stack", "deallocated", "local variable", "lifetime"],
    quick_picks: [
      "Returns pointer to local variable that is destroyed after call",
      "Pointer variables require memory allocation",
      "The value 42 overflows stack parameters",
      "Dereferencing local pointers is compiler error"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_048",
    title: "Macro Expansion Order",
    language: "cpp",
    difficulty: "advanced",
    category: "wrong_operator",
    code_snippet: `#define SQUARE(x) x * x

int val = SQUARE(2 + 3);`,
    input_given: "val value",
    expected_output: "25",
    actual_output: "11",
    bug_type: "wrong_operator",
    hint: "Think about how macros expand text before compilation. Write down the expanded form of SQUARE(2 + 3).",
    explanation: "C++ macros perform direct text replacement, so SQUARE(2 + 3) expands to '2 + 3 * 2 + 3'. Due to operator precedence, this evaluates to 2 + 6 + 3 = 11. To fix this, wrap the macro parameters in parentheses: #define SQUARE(x) ((x) * (x)).",
    correct_keywords: ["macro expansion", "text replacement", "parentheses", "precedence", "expand"],
    quick_picks: [
      "Macro expands to 2 + 3 * 2 + 3 due to lack of parentheses",
      "Preprocessors do not support addition",
      "The values are calculated in octal",
      "SQUARE function is missing from scope"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_049",
    title: "String Const Pointer Comparison",
    language: "cpp",
    difficulty: "expert",
    category: "string_comparison",
    code_snippet: `bool isMatch(const char* s1, const char* s2) {
    return s1 == s2;
}`,
    input_given: "s1='apple', s2='apple' (constructed separately)",
    expected_output: "true",
    actual_output: "false",
    bug_type: "string_comparison",
    hint: "How do you compare character pointer values vs the characters they point to?",
    explanation: "The '==' operator on char pointers compares the memory addresses. If s1 and s2 are separate strings with identical content, their addresses differ, causing the comparison to fail. Use strcmp(s1, s2) == 0.",
    correct_keywords: ["strcmp", "pointer comparison", "address", "addresses", "char pointer", "content"],
    quick_picks: [
      "Compares char pointer memory addresses instead of string text",
      "Const variables cannot be compared directly",
      "String parameters require double brackets",
      "Null checks are failing inside function"
    ],
    correct_quick_pick: 0
  },
  {
    id: "puzzle_050",
    title: "Static Variable Lifetime",
    language: "cpp",
    difficulty: "expert",
    category: "scope_error",
    code_snippet: `int getIncremented() {
    static int num = 0;
    num++;
    return num;
}`,
    input_given: "Call function twice",
    expected_output: "First call: 1, Second call: 1 (resetting)",
    actual_output: "First call: 1, Second call: 2",
    bug_type: "scope_error",
    hint: "What is the lifetime of a static variable declared inside a function block?",
    explanation: "Static variables inside functions retain their value across calls and are initialized only once. The variable 'num' is not reset, so the second call increments the persistent state to 2. Remove 'static' for transient counts.",
    correct_keywords: ["static variable", "lifetime", "retain value", "initialized once", "persistent"],
    quick_picks: [
      "Static variables persist and retain their value across function calls",
      "Return value type should be void",
      "Static variables are read-only",
      "C++ forbids static variables inside blocks"
    ],
    correct_quick_pick: 0
  }
];
