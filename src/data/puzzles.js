// ═══════════════════════════════════════════════════════════════════════════════
//  Spot the Bug — Academic Puzzle Database  (v2.0)
//  50 handcrafted puzzles based on documented CS student mistakes
//  Researched from: ACM beginner-error studies, Stack Overflow surveys,
//  university grading data, and real classroom submissions.
//
//  Distribution:
//    Language   → Python 14 | JavaScript 14 | Java 12 | C++ 10
//    Difficulty → Beginner 15 | Intermediate 18 | Advanced 12 | Expert 5
//    Categories → All 12 academic mistake types represented
// ═══════════════════════════════════════════════════════════════════════════════

export const puzzles = [

  // ─────────────────────────────────────────────────────────────────────────────
  // PYTHON PUZZLES  (001 – 014)
  // ─────────────────────────────────────────────────────────────────────────────

  {
    id: "puzzle_001",
    title: "Grade List Cutoff",
    language: "python",
    difficulty: "beginner",
    category: "off_by_one",
    code_snippet: `def get_passing_grades(grades):
    passing = []
    for i in range(len(grades) - 1):
        if grades[i] >= 50:
            passing.append(grades[i])
    return passing

print(get_passing_grades([45, 72, 88, 91, 55]))`,
    input_given: "[45, 72, 88, 91, 55]",
    expected_output: "[72, 88, 91, 55]",
    actual_output: "[72, 88, 91]",
    bug_type: "off_by_one",
    hint: "Count how many iterations range(len(grades) - 1) actually produces.",
    explanation: "range(len(grades) - 1) generates indices 0 through 3, silently skipping index 4 (the value 55). Because 55 >= 50 it should be included. Fix: use range(len(grades)), or iterate directly with for grade in grades.",
    correct_keywords: ["range", "length", "off by one", "last element", "index", "len - 1"],
    quick_picks: [
      "range() stops one index before the last element",
      "The >= operator should be > to exclude borderline scores",
      "passing list must be declared globally",
      "return should be inside the loop"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_002",
    title: "Grade Assignment Bug",
    language: "python",
    difficulty: "beginner",
    category: "assignment_vs_comparison",
    code_snippet: `def get_letter_grade(score):
    if score >= 90:
        grade == "A"
    elif score >= 80:
        grade = "B"
    else:
        grade = "C"
    return grade

print(get_letter_grade(95))`,
    input_given: "score=95",
    expected_output: "\"A\"",
    actual_output: "UnboundLocalError: local variable 'grade' referenced before assignment",
    bug_type: "assignment_vs_comparison",
    hint: "Look very carefully at the operator on the line inside the first if block.",
    explanation: "grade == \"A\" is a comparison expression, not an assignment — it evaluates to False and discards the result. So grade is never assigned when score >= 90, and return grade crashes with UnboundLocalError. Fix: change grade == \"A\" to grade = \"A\".",
    correct_keywords: ["==", "=", "assignment", "comparison", "UnboundLocalError"],
    quick_picks: [
      "The elif threshold should be >= 85 not >= 80",
      "return grade must be placed inside the if block",
      "'==' compares instead of assigning — grade is never set for score >= 90",
      "grade must be initialised to None before the if block"
    ],
    correct_quick_pick: 2
  },

  {
    id: "puzzle_003",
    title: "Score Input Concatenates",
    language: "python",
    difficulty: "beginner",
    category: "string_vs_number",
    code_snippet: `def add_bonus(base_score, bonus):
    return base_score + bonus

user_input = input("Enter your exam score: ")  # user types 80
final = add_bonus(user_input, 10)
print("Final score:", final)`,
    input_given: "User types \"80\", bonus=10",
    expected_output: "Final score: 90",
    actual_output: "Final score: 8010",
    bug_type: "string_vs_number",
    hint: "What data type does Python's input() always return, regardless of what the user types?",
    explanation: "Python's input() always returns a string. Adding the string '80' and the integer 10 with + performs string concatenation, yielding '8010' instead of 90. Fix: convert before calling — user_input = int(input(\"Enter your exam score: \")).",
    correct_keywords: ["input", "string", "int", "concatenation", "type", "convert"],
    quick_picks: [
      "The + operator needs to be replaced with sum()",
      "input() returns a string — '80' + 10 concatenates instead of adding",
      "bonus should also be a string to match user_input",
      "print() formats numbers incorrectly"
    ],
    correct_quick_pick: 1
  },

  {
    id: "puzzle_004",
    title: "Exam Eligibility Check",
    language: "python",
    difficulty: "beginner",
    category: "wrong_logical_operator",
    code_snippet: `def can_sit_exam(attendance_pct, assignments_done):
    if attendance_pct >= 75 or assignments_done >= 8:
        return "Eligible"
    return "Not eligible"

print(can_sit_exam(80, 3))`,
    input_given: "attendance_pct=80, assignments_done=3",
    expected_output: "\"Not eligible\"",
    actual_output: "\"Eligible\"",
    bug_type: "wrong_logical_operator",
    hint: "The university policy says BOTH thresholds must be met — which Python keyword enforces that?",
    explanation: "Using or means the student is eligible if either condition passes alone. With attendance=80 and assignments=3, attendance is sufficient, so it grants eligibility even though assignments are insufficient. Change or to and.",
    correct_keywords: ["or", "and", "both conditions", "logical operator", "policy"],
    quick_picks: [
      "'or' allows either condition alone to grant eligibility — use 'and' to require both",
      "attendance threshold should be 70, not 75",
      "The return values 'Eligible' and 'Not eligible' are swapped",
      "Comparison operators should be > not >="
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_005",
    title: "Missing Student Name Crash",
    language: "python",
    difficulty: "beginner",
    category: "null_none_undefined",
    code_snippet: `def get_display_name(student):
    name = student.get("name")
    return name.upper()

profile = {"email": "alice@uni.edu", "gpa": 3.8}
print(get_display_name(profile))`,
    input_given: "{\"email\": \"alice@uni.edu\", \"gpa\": 3.8} — no \"name\" key",
    expected_output: "\"GUEST\" (or graceful fallback)",
    actual_output: "AttributeError: 'NoneType' object has no attribute 'upper'",
    bug_type: "null_none_undefined",
    hint: "What exactly does dict.get() return when the requested key is absent?",
    explanation: "dict.get(\"name\") silently returns None when the key doesn't exist. Calling .upper() on None raises AttributeError. Fix: provide a fallback — student.get(\"name\", \"Guest\").upper() — or check if name is None before calling the method.",
    correct_keywords: ["None", "get", "default", "AttributeError", "dict", "fallback"],
    quick_picks: [
      "dict.get() returns None when key is missing — .upper() on None crashes",
      "The key \"name\" must be capitalised as \"Name\"",
      "upper() is not a method on Python strings",
      "student must be a class instance, not a dict"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_006",
    title: "Global Counter Not Updated",
    language: "python",
    difficulty: "intermediate",
    category: "variable_scope",
    code_snippet: `submissions = 0

def submit_assignment():
    submissions = submissions + 1

submit_assignment()`,
    input_given: "Called once",
    expected_output: "submissions incremented to 1",
    actual_output: "UnboundLocalError: local variable 'submissions' referenced before assignment",
    bug_type: "variable_scope",
    hint: "Python determines whether a variable is local or global based on whether it is assigned anywhere in the function.",
    explanation: "Because submissions appears on the left side of an assignment inside the function, Python treats it as a local variable for the entire function. On the right side of submissions + 1, Python reads an uninitialized local variable and crashes. Fix: add global submissions as the very first line inside the function.",
    correct_keywords: ["global", "local", "scope", "UnboundLocalError", "assign"],
    quick_picks: [
      "submissions must be passed as a parameter to the function",
      "Without 'global' keyword the assignment creates an uninitialized local variable",
      "The function needs to return submissions instead of modifying it",
      "submissions + 1 should use += instead"
    ],
    correct_quick_pick: 1
  },

  {
    id: "puzzle_007",
    title: "Countdown Loop Freezes",
    language: "python",
    difficulty: "intermediate",
    category: "infinite_loop",
    code_snippet: `def generate_countdown(start):
    result = []
    while start > 0:
        result.append(start)
        start = start
    return result

print(generate_countdown(5))`,
    input_given: "start=5",
    expected_output: "[5, 4, 3, 2, 1]",
    actual_output: "Program hangs (infinite loop)",
    bug_type: "infinite_loop",
    hint: "Trace the value of start after each loop body execution — does it ever change?",
    explanation: "start = start assigns start back to itself on every iteration — it never decreases. The condition start > 0 stays permanently True, causing an infinite loop. Fix: change start = start to start -= 1.",
    correct_keywords: ["decrement", "start -= 1", "infinite loop", "never changes", "loop variable"],
    quick_picks: [
      "The while condition should use >= 0 instead of > 0",
      "result.append() should be called after the loop ends",
      "start = start never decrements the variable — loop runs forever",
      "generate_countdown should use range() not while"
    ],
    correct_quick_pick: 2
  },

  {
    id: "puzzle_008",
    title: "Shared Roster Across Calls",
    language: "python",
    difficulty: "intermediate",
    category: "mutable_default_args",
    code_snippet: `def add_student(name, roster=[]):
    roster.append(name)
    return roster

print(add_student("Alice"))
print(add_student("Bob"))`,
    input_given: "Two separate calls with no roster argument",
    expected_output: "['Alice'] then ['Bob']",
    actual_output: "['Alice'] then ['Alice', 'Bob']",
    bug_type: "mutable_default_args",
    hint: "Python evaluates default argument values exactly once — when the function is first defined, not on every call.",
    explanation: "The default list [] is created once when the function definition is executed. Every call that omits the roster parameter shares the same list object, so entries accumulate. Fix: use def add_student(name, roster=None) and set roster = [] inside the body when roster is None.",
    correct_keywords: ["mutable default", "evaluated once", "default argument", "shared list", "None"],
    quick_picks: [
      "Default list [] is created once and shared across every call that omits the argument",
      "roster.append() should be replaced with roster = roster + [name]",
      "Python automatically resets mutable defaults between calls",
      "The function should accept *names for multiple students"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_009",
    title: "Age Comparison Never Matches",
    language: "python",
    difficulty: "intermediate",
    category: "type_coercion",
    code_snippet: `def check_age_limit(age_limit):
    user_age = input("Enter your age: ")  # user types 20
    if user_age == age_limit:
        return "Access granted"
    return "Access denied"

print(check_age_limit(20))`,
    input_given: "User types \"20\", age_limit=20",
    expected_output: "\"Access granted\"",
    actual_output: "\"Access denied\"",
    bug_type: "type_coercion",
    hint: "input() always returns a string. What type is age_limit?",
    explanation: "input() always returns a str. Comparing str '20' to int 20 with == returns False in Python — unlike JavaScript, Python does not coerce types on ==. Fix: wrap the input call with int() — user_age = int(input(\"Enter your age: \")).",
    correct_keywords: ["input", "string", "int", "type comparison", "== False", "convert"],
    quick_picks: [
      "input() returns a string; '20' == 20 is False in Python",
      "age_limit should be converted to str before comparison",
      "The == operator should be is for primitive comparison",
      "Access granted must be returned from inside the if block"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_010",
    title: "Grade Cache Accumulates",
    language: "python",
    difficulty: "intermediate",
    category: "mutable_default_args",
    code_snippet: `def record_grade(subject, grade, cache={}):
    cache[subject] = grade
    return cache

print(record_grade("Math", "A"))
print(record_grade("English", "B"))`,
    input_given: "Two separate calls with no cache argument",
    expected_output: "{'Math': 'A'} then {'English': 'B'}",
    actual_output: "{'Math': 'A'} then {'Math': 'A', 'English': 'B'}",
    bug_type: "mutable_default_args",
    hint: "Is a new empty dict created each time record_grade is called without a cache?",
    explanation: "The default dict {} is created exactly once when the function is defined. Both calls share the same dict instance, so entries from earlier calls persist. Fix: use cache=None and initialise cache = {} inside the body when cache is None.",
    correct_keywords: ["mutable default", "dict", "shared state", "evaluated once", "cache"],
    quick_picks: [
      "Dictionaries passed as arguments are always copied",
      "cache[subject] should use .update() not direct assignment",
      "The function should return a copy of cache not cache itself",
      "Default dict {} persists across calls — entries accumulate"
    ],
    correct_quick_pick: 3
  },

  {
    id: "puzzle_011",
    title: "Honor Roll List Disappears",
    language: "python",
    difficulty: "advanced",
    category: "return_missing",
    code_snippet: `def get_honor_students(students):
    honor_list = []
    for student in students:
        if student["gpa"] >= 3.7:
            honor_list.append(student["name"])

data = [
    {"name": "Alice", "gpa": 3.9},
    {"name": "Bob",   "gpa": 3.2}
]
print(get_honor_students(data))`,
    input_given: "List of student dicts",
    expected_output: "['Alice']",
    actual_output: "None",
    bug_type: "return_missing",
    hint: "After the loop finishes building honor_list, what does the function do with it?",
    explanation: "The function correctly builds honor_list but never returns it. Python functions implicitly return None when there is no return statement. Fix: add return honor_list as the last line of the function.",
    correct_keywords: ["return", "None", "missing return", "implicit None", "honor_list"],
    quick_picks: [
      "Function builds honor_list but never returns it — implicitly returns None",
      "The GPA threshold >= 3.7 excludes too many students",
      "return honor_list must be inside the for loop",
      "honor_list must be a set not a list"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_012",
    title: "Login Log Keeps Growing",
    language: "python",
    difficulty: "advanced",
    category: "mutable_default_args",
    code_snippet: `def record_login(username, log=[]):
    log.append(username)
    return log

s1 = record_login("alice")
s2 = record_login("bob")
print(s1)
print(s2)`,
    input_given: "Two separate calls, no log argument provided",
    expected_output: "['alice']\n['bob']",
    actual_output: "['alice', 'bob']\n['alice', 'bob']",
    bug_type: "mutable_default_args",
    hint: "s1 and s2 both come from the same function default — do they point to different list objects?",
    explanation: "Both calls share the same mutable default list. Every call appends to it and returns a reference to the same object. So s1 and s2 are identical references to ['alice', 'bob']. Fix: use log=None, and inside the body set log = [] if log is None.",
    correct_keywords: ["mutable default", "same object", "reference", "shared list", "log=None"],
    quick_picks: [
      "Both calls return a reference to the same default list — they see each other's entries",
      "append() should be replaced with + to create a new list",
      "log parameter needs type annotation list[str]",
      "record_login should use *username to handle multiple users"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_013",
    title: "Sort Permanently Reorders Grades",
    language: "python",
    difficulty: "advanced",
    category: "pass_by_value_reference",
    code_snippet: `def get_top_three(scores):
    scores.sort(reverse=True)
    return scores[:3]

student_scores = [72, 91, 65, 88, 55, 100]
top = get_top_three(student_scores)
print(student_scores)`,
    input_given: "[72, 91, 65, 88, 55, 100]",
    expected_output: "[72, 91, 65, 88, 55, 100] (original scores unsorted)",
    actual_output: "[100, 91, 88, 72, 65, 55] (sorted in-place)",
    bug_type: "pass_by_value_reference",
    hint: "Does .sort() create a new sorted list or does it modify the existing one?",
    explanation: "Python lists are passed by reference. scores inside the function points to the same list object as student_scores. Calling scores.sort() sorts that object in place, permanently reordering the caller's data. Fix: use sorted() instead — scores = sorted(scores, reverse=True) — which returns a new list.",
    correct_keywords: ["sort", "in-place", "reference", "passed by reference", "sorted()"],
    quick_picks: [
      "scores[:3] slices in the wrong direction",
      ".sort() modifies the list in-place — original is permanently reordered",
      "get_top_three needs to return a copy using list(scores)",
      "student_scores is passed as a keyword argument so it is protected"
    ],
    correct_quick_pick: 1
  },

  {
    id: "puzzle_014",
    title: "Average Calculator — Double Fault",
    language: "python",
    difficulty: "expert",
    category: "multi_bug",
    code_snippet: `def calculate_average(scores):
    total = 0
    for i in range(1, len(scores)):
        total = total + scores[i]
    return total / len(scores)

grades = [85, 90, 78, 92, 88]
print(calculate_average(grades))`,
    input_given: "[85, 90, 78, 92, 88]",
    expected_output: "86.6",
    actual_output: "69.6",
    bug_type: "multi_bug",
    hint: "Two separate bugs exist here — inspect both where the loop starts and what the denominator uses.",
    explanation: "Bug 1: range(1, len(scores)) starts at index 1, skipping grades[0]=85. Bug 2: the function divides by len(scores)=5, but only 4 values were summed — the denominator should also be 4 (or iterate all 5 elements). Together: 348/5=69.6 instead of 433/5=86.6. Fix: change range(1, len(scores)) to range(len(scores)).",
    correct_keywords: ["range", "off by one", "index 0", "denominator", "loop start", "len"],
    quick_picks: [
      "Loop starts at index 1, skipping grades[0]; division still uses full length 5",
      "total is not initialised before the loop",
      "Division should use integer division //",
      "len(scores) should be len(scores) - 1 in the denominator"
    ],
    correct_quick_pick: 0
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // JAVASCRIPT PUZZLES  (015 – 028)
  // ─────────────────────────────────────────────────────────────────────────────

  {
    id: "puzzle_015",
    title: "Last Homework Score Undefined",
    language: "javascript",
    difficulty: "beginner",
    category: "off_by_one",
    code_snippet: `function getLastScore(scores) {
  return scores[scores.length];
}

const results = [72, 88, 95, 61];
console.log(getLastScore(results));`,
    input_given: "[72, 88, 95, 61]",
    expected_output: "61",
    actual_output: "undefined",
    bug_type: "off_by_one",
    hint: "A 4-element array has indices 0, 1, 2, 3. Where does scores.length point?",
    explanation: "Arrays are zero-indexed, so a 4-element array has valid indices 0–3. scores.length equals 4, which is one past the last valid index — returning undefined. Fix: use scores[scores.length - 1].",
    correct_keywords: ["length", "0-indexed", "length - 1", "undefined", "index", "off by one"],
    quick_picks: [
      "scores.length equals 4 but last valid index is 3 — use scores.length - 1",
      "getLastScore should sort the array first",
      "undefined means the array is empty",
      "JavaScript arrays use 1-based indexing"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_016",
    title: "Admin Check Always Passes",
    language: "javascript",
    difficulty: "beginner",
    category: "assignment_vs_comparison",
    code_snippet: `function isAdmin(role) {
  if (role = "admin") {
    return true;
  }
  return false;
}

console.log(isAdmin("student"));`,
    input_given: "\"student\"",
    expected_output: "false",
    actual_output: "true",
    bug_type: "assignment_vs_comparison",
    hint: "In JavaScript, = and === do completely different things inside an if condition.",
    explanation: "role = \"admin\" is an assignment, not a comparison. It assigns the string \"admin\" to role, and the expression evaluates to the truthy string \"admin\", so it always returns true regardless of the original value. Fix: use role === \"admin\".",
    correct_keywords: ["assignment", "===", "=", "comparison", "always true", "truthy"],
    quick_picks: [
      "= assigns a value — the truthy result always enters the if block",
      "The function needs two parameters to compare roles",
      "return true should be return role",
      "isAdmin should use typeof to check the type"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_017",
    title: "Cart Total Concatenates",
    language: "javascript",
    difficulty: "beginner",
    category: "string_vs_number",
    code_snippet: `function calculateTotal(price, tax) {
  return price + tax;
}

const userPrice = "49";   // value from a form input field
const taxAmount = 5;
console.log(calculateTotal(userPrice, taxAmount));`,
    input_given: "price=\"49\" (string), tax=5",
    expected_output: "54",
    actual_output: "\"495\"",
    bug_type: "string_vs_number",
    hint: "What does JavaScript's + operator do when one of its operands is a string?",
    explanation: "When one operand is a string, JavaScript's + performs string concatenation. \"49\" + 5 becomes \"495\" instead of 54. This happens often with form inputs, which are always strings. Fix: convert price first — Number(price) + tax or parseFloat(price) + tax.",
    correct_keywords: ["concatenation", "string", "Number()", "parseFloat", "type coercion", "form input"],
    quick_picks: [
      "Tax should also be a string to match price type",
      "Use Math.add() for safe numeric addition",
      "String + number concatenates — convert price with Number() first",
      "The + operator is invalid for mixed types in JS"
    ],
    correct_quick_pick: 2
  },

  {
    id: "puzzle_018",
    title: "Weekend Check Always Fails",
    language: "javascript",
    difficulty: "beginner",
    category: "wrong_logical_operator",
    code_snippet: `function isWeekend(day) {
  if (day === "Saturday" && day === "Sunday") {
    return true;
  }
  return false;
}

console.log(isWeekend("Saturday"));`,
    input_given: "\"Saturday\"",
    expected_output: "true",
    actual_output: "false",
    bug_type: "wrong_logical_operator",
    hint: "Can a single variable hold two different string values at the same time?",
    explanation: "A variable cannot simultaneously equal both \"Saturday\" AND \"Sunday\". The && operator requires both conditions to be true at once — which is logically impossible for a single string. Fix: use || (OR): day === \"Saturday\" || day === \"Sunday\".",
    correct_keywords: ["&&", "||", "AND", "OR", "impossible condition", "both true"],
    quick_picks: [
      "'&&' requires both to be true at once — use '||' instead",
      "=== should be == for flexible string comparison",
      "The conditions are evaluated in the wrong order",
      "isWeekend should accept a numeric day index 0–6"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_019",
    title: "Loose Equality Score Trap",
    language: "javascript",
    difficulty: "intermediate",
    category: "type_coercion",
    code_snippet: `function checkPassingScore(score) {
  if (score == true) {
    return "Passed!";
  }
  return "Failed.";
}

console.log(checkPassingScore(100));`,
    input_given: "100",
    expected_output: "\"Passed!\"",
    actual_output: "\"Failed.\"",
    bug_type: "type_coercion",
    hint: "When == compares a number to a boolean, JavaScript converts the boolean first — to what?",
    explanation: "JavaScript coerces true to the number 1 before comparing. score == true is equivalent to score == 1. So only the number 1 passes — not 100, not any other truthy number. Fix: replace with a meaningful numeric condition like score >= 60.",
    correct_keywords: ["type coercion", "==", "true", "1", "boolean to number", "==="],
    quick_picks: [
      "== coerces true to 1 — only the number 1 passes, not any truthy value",
      "score should be converted with Boolean() before comparison",
      "true must be written as the string \"true\"",
      "100 is not a valid exam score for this check"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_020",
    title: "Closures All Print the Same Name",
    language: "javascript",
    difficulty: "intermediate",
    category: "variable_scope",
    code_snippet: `function makeGreetings(names) {
  const greetings = [];
  for (var i = 0; i < names.length; i++) {
    greetings.push(function() {
      return "Hello, " + names[i];
    });
  }
  return greetings;
}

const fns = makeGreetings(["Alice", "Bob", "Carol"]);
console.log(fns[0]());`,
    input_given: "[\"Alice\", \"Bob\", \"Carol\"]",
    expected_output: "\"Hello, Alice\"",
    actual_output: "\"Hello, undefined\"",
    bug_type: "variable_scope",
    hint: "When fns[0]() executes, the loop is long finished — what is i at that point?",
    explanation: "var does not have block scope — i is function-scoped and shared by all closures. By the time any closure runs, the loop has finished and i equals 3. names[3] is undefined. Fix: change var i to let i, which creates a fresh binding per iteration.",
    correct_keywords: ["var", "let", "closure", "block scope", "loop variable", "captured", "function scope"],
    quick_picks: [
      "var gives function scope — all closures share i=3 after the loop ends",
      "Arrow functions are required inside the loop, not regular functions",
      "push() should be called after the loop, not inside it",
      "names[i] should be passed as an argument to capture the value"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_021",
    title: "Nested Property Chain Crash",
    language: "javascript",
    difficulty: "intermediate",
    category: "null_none_undefined",
    code_snippet: `function getStudentCity(student) {
  return student.address.city.toUpperCase();
}

const alice = { name: "Alice", gpa: 3.8 };
console.log(getStudentCity(alice));`,
    input_given: "{ name: \"Alice\", gpa: 3.8 } — no address property",
    expected_output: "\"UNKNOWN\" (graceful fallback)",
    actual_output: "TypeError: Cannot read properties of undefined (reading 'city')",
    bug_type: "null_none_undefined",
    hint: "What is student.address when alice has no address field?",
    explanation: "student.address is undefined because alice doesn't have that field. Chaining .city on undefined throws a TypeError. Fix: use optional chaining — student.address?.city?.toUpperCase() ?? \"UNKNOWN\" — which safely short-circuits if any property is absent.",
    correct_keywords: ["undefined", "optional chaining", "?.", "TypeError", "nested object", "nullish"],
    quick_picks: [
      "student.address is undefined — chaining .city on undefined causes TypeError",
      "toUpperCase() is not available on all strings",
      "address must be declared globally before accessing",
      "Objects need class syntax to support nested properties"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_022",
    title: "Pagination Loader Hangs",
    language: "javascript",
    difficulty: "intermediate",
    category: "infinite_loop",
    code_snippet: `function loadPageTitles(totalPages) {
  let page = 1;
  const loaded = [];
  while (page <= totalPages) {
    loaded.push("Page " + page);
  }
  return loaded;
}

console.log(loadPageTitles(3));`,
    input_given: "totalPages=3",
    expected_output: "[\"Page 1\", \"Page 2\", \"Page 3\"]",
    actual_output: "Browser/Node hangs (infinite loop)",
    bug_type: "infinite_loop",
    hint: "After each loop iteration, what happens to the value of page?",
    explanation: "page is initialised to 1 and never incremented inside the loop. page <= totalPages (1 <= 3) is permanently true. Fix: add page++ or page += 1 at the end of the while loop body.",
    correct_keywords: ["increment", "page++", "infinite loop", "while", "loop variable", "never incremented"],
    quick_picks: [
      "page is never incremented — loop condition never becomes false",
      "The loop should be a for loop, not while",
      "loaded.push() prevents the page counter from advancing",
      "totalPages should be checked with < not <="
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_023",
    title: "Object Score Mutated by Function",
    language: "javascript",
    difficulty: "intermediate",
    category: "pass_by_value_reference",
    code_snippet: `function addBonus(student, bonus) {
  student.score += bonus;
  return student;
}

const alice = { name: "Alice", score: 80 };
const updated = addBonus(alice, 10);
console.log(alice.score);`,
    input_given: "alice={name:\"Alice\", score:80}, bonus=10",
    expected_output: "80 (original student object score stays unchanged)",
    actual_output: "90 (original score mutated in-place)",
    bug_type: "pass_by_value_reference",
    hint: "In JavaScript, how are objects shared when passed to a function?",
    explanation: "JavaScript passes objects by reference. student inside addBonus points to the same object in memory as alice. Modifying student.score also modifies alice.score. Fix: create a shallow copy — return { ...student, score: student.score + bonus } — instead of mutating the original.",
    correct_keywords: ["pass by reference", "object", "mutation", "spread operator", "copy", "reference"],
    quick_picks: [
      "Objects are passed by reference — modifying student also changes alice",
      "+= should be replaced with = to avoid mutation",
      "return student returns a copy, leaving the original unchanged",
      "JavaScript objects are always immutable"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_024",
    title: "Filter Callback Returns Nothing",
    language: "javascript",
    difficulty: "advanced",
    category: "return_missing",
    code_snippet: `function getTopStudents(students) {
  return students.filter(function(student) {
    student.gpa >= 3.5;
  });
}

const data = [
  { name: "Alice", gpa: 3.9 },
  { name: "Bob",   gpa: 3.1 }
];
console.log(getTopStudents(data));`,
    input_given: "Array of student objects",
    expected_output: "[{name:\"Alice\",gpa:3.9}]",
    actual_output: "[]",
    bug_type: "return_missing",
    hint: "The callback uses curly braces — does the boolean expression's result reach filter()?",
    explanation: "Curly braces {} create a block body, which requires an explicit return statement. student.gpa >= 3.5 evaluates to a boolean, but without return the result is discarded — the callback returns undefined (falsy), so filter() drops every element. Fix: add return before the expression, or remove the curly braces.",
    correct_keywords: ["return", "filter callback", "block body", "curly braces", "undefined", "falsy"],
    quick_picks: [
      "filter() only works with arrow functions, not regular functions",
      "Block-body callback has no return — filter receives undefined for every element",
      "gpa >= 3.5 should use > for strict filtering",
      "The callback should return the student's name, not the condition"
    ],
    correct_quick_pick: 1
  },

  {
    id: "puzzle_025",
    title: "Var Hoisting Hides Undefined",
    language: "javascript",
    difficulty: "advanced",
    category: "variable_scope",
    code_snippet: `function processStudentScore() {
  console.log("Score is:", score);
  var score = 95;
}

processStudentScore();`,
    input_given: "No arguments",
    expected_output: "ReferenceError: score is not defined",
    actual_output: "Score is: undefined",
    bug_type: "variable_scope",
    hint: "JavaScript hoists var declarations — but does it also hoist the assignment?",
    explanation: "JavaScript hoists var declarations to the top of their enclosing function, but leaves assignments in place. So score exists (as undefined) before its var score = 95 line runs. Fix: always declare with let or const at the top before use.",
    correct_keywords: ["hoisting", "var", "undefined", "declaration", "assignment", "let", "const"],
    quick_picks: [
      "var is hoisted — declaration exists but is undefined until the assignment line",
      "console.log cannot read variables declared with var",
      "JavaScript throws ReferenceError for any var used before declaration",
      "score is in global scope not function scope"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_026",
    title: "Exam Score Ranking Scrambled",
    language: "javascript",
    difficulty: "advanced",
    category: "string_vs_number",
    code_snippet: `function rankScores(scores) {
  return scores.sort();
}

const examScores = [100, 9, 45];
console.log(rankScores(examScores));`,
    input_given: "[100, 9, 45]",
    expected_output: "[9, 45, 100]",
    actual_output: "[100, 45, 9]",
    bug_type: "string_vs_number",
    hint: "How does JavaScript's default sort() compare numbers — as numbers or as something else?",
    explanation: "JavaScript's default sort() converts elements to strings and sorts them lexicographically. \"100\" < \"9\" because \"1\" < \"9\" in Unicode order. Fix: provide a numeric comparator — scores.sort((a, b) => a - b).",
    correct_keywords: ["sort", "lexicographic", "string comparison", "comparator", "(a, b) => a - b", "default sort"],
    quick_picks: [
      "Default sort() converts to strings — 100 sorts before 9 lexicographically",
      "sort() only works on arrays of strings, not numbers",
      "examScores must be sorted before passing to the function",
      "Descending order requires .reverse() to be called before .sort()"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_027",
    title: "Recursive Countdown Never Stops",
    language: "javascript",
    difficulty: "expert",
    category: "recursion_base_case",
    code_snippet: `function countdown(n) {
      if (n === 0) {
        return;
      }
      countdown(n - 1);
    }
    
    countdown(-1);`,
    input_given: "n=-1",
    expected_output: "Function returns instantly (handles negative exponent/boundary)",
    actual_output: "Maximum call stack size exceeded (stack overflow)",
    bug_type: "recursion_base_case",
    hint: "Starting from -1 and subtracting 1 each call — does n ever exactly equal 0?",
    explanation: "Starting from -1, each recursive call subtracts 1 further: -2, -3, -4... The base case n === 0 is never reached because n moves away from 0 in the wrong direction, causing unbounded recursion. Fix: change base case to if (n <= 0) return.",
    correct_keywords: ["base case", "stack overflow", "recursion", "n <= 0", "negative", "never reaches"],
    quick_picks: [
      "Base case n === 0 is never reached for negative input — infinite recursion",
      "countdown needs a second parameter to track recursion depth",
      "console.log should be called after the recursive call",
      "Recursion is not valid for countdown — use a for loop"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_028",
    title: "Async Fetch + Var Scope Combo",
    language: "javascript",
    difficulty: "expert",
    category: "multi_bug",
    code_snippet: `function loadUserNames(ids) {
  var names = [];
  for (var i = 0; i < ids.length; i++) {
    setTimeout(function() {
      names.push("User-" + ids[i]);
    }, i * 100);
  }
  return names;
}

const result = loadUserNames([10, 20, 30]);
console.log(result);`,
    input_given: "[10, 20, 30]",
    expected_output: "[\"User-10\", \"User-20\", \"User-30\"] (after delays)",
    actual_output: "[] immediately, then [\"User-undefined\", \"User-undefined\", \"User-undefined\"]",
    bug_type: "multi_bug",
    hint: "Two separate bugs: one is about when return runs vs when callbacks fire, the other is about what i equals when callbacks finally execute.",
    explanation: "Bug 1: return names runs synchronously before any setTimeout callback fires — the returned array is always empty. Bug 2: var i has function scope; by the time callbacks execute, i equals 3 (after the loop) — ids[3] is undefined. Fix: use let i and async promises.",
    correct_keywords: ["setTimeout", "async", "var", "let", "closure", "scope", "timing", "synchronous"],
    quick_picks: [
      "Function returns before timeouts fire AND var i is shared — equals 3 when callbacks run",
      "names must be declared globally to be accessible from callbacks",
      "setTimeout requires a try-catch wrapper to work correctly",
      "ids must be spread into individual variables before the loop"
    ],
    correct_quick_pick: 0
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // JAVA PUZZLES  (029 – 040)
  // ─────────────────────────────────────────────────────────────────────────────

  {
    id: "puzzle_029",
    title: "Top Grade Returns Wrong Element",
    language: "java",
    difficulty: "beginner",
    category: "off_by_one",
    code_snippet: `public int getTopGrade(int[] grades) {
    return grades[1];
}
// Call: getTopGrade(new int[]{95, 88, 72})`,
    input_given: "int[]{95, 88, 72}",
    expected_output: "95 (first element)",
    actual_output: "88 (second element)",
    bug_type: "off_by_one",
    hint: "In Java, what is the index of the very first element in any array?",
    explanation: "Java arrays are zero-indexed. grades[1] retrieves the second element (88), not the first. Fix: return grades[0].",
    correct_keywords: ["0-indexed", "index 0", "first element", "array", "zero"],
    quick_picks: [
      "Arrays are 0-indexed — first element is at index 0, not 1",
      "Java arrays start at index 1 unlike Python",
      "The array must be sorted before index access",
      "grades.length should be used instead of a hardcoded index"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_030",
    title: "Password Check Always Fails",
    language: "java",
    difficulty: "beginner",
    category: "assignment_vs_comparison",
    code_snippet: `public boolean verifyPassword(String input) {
    if (input == "secret123") {
        return true;
    }
    return false;
}
// Call: verifyPassword(new String("secret123"))`,
    input_given: "new String(\"secret123\")",
    expected_output: "true",
    actual_output: "false",
    bug_type: "assignment_vs_comparison",
    hint: "In Java, == on String objects checks something other than their text content.",
    explanation: "In Java, == on String objects compares object references (memory addresses), not content. Two String objects with identical text but created separately occupy different memory locations, so == returns false. Fix: use input.equals(\"secret123\").",
    correct_keywords: ["equals()", "==", "reference comparison", "String", "content", "memory"],
    quick_picks: [
      "== compares object references in Java — use .equals() for content comparison",
      "input should be char[] not String for password security",
      "Java String comparison requires .compareTo() method",
      "The if condition must use String.matches() for literals"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_031",
    title: "Class Average Gets Truncated",
    language: "java",
    difficulty: "beginner",
    category: "type_coercion",
    code_snippet: `public double getClassAverage(int totalPoints, int students) {
    double average = totalPoints / students;
    return average;
}
// Call: getClassAverage(431, 5)`,
    input_given: "totalPoints=431, students=5",
    expected_output: "86.2",
    actual_output: "86.0",
    bug_type: "type_coercion",
    hint: "Both parameters are int — what type of division does Java perform between two int values?",
    explanation: "When both operands are int, Java performs integer division, discarding the remainder. 431 / 5 = 86 (integer). That result is then widened to 86.0 as a double. Fix: cast one operand first — (double) totalPoints / students.",
    correct_keywords: ["integer division", "cast", "(double)", "truncation", "floating point", "int / int"],
    quick_picks: [
      "average should be initialised as double average = 0.0",
      "int / int performs integer division before widening to double — cast one operand",
      "students should be declared as long for precision",
      "Java requires Math.round() for accurate division"
    ],
    correct_quick_pick: 1
  },

  {
    id: "puzzle_032",
    title: "Student Name Crashes on Access",
    language: "java",
    difficulty: "intermediate",
    category: "null_none_undefined",
    code_snippet: `public class Student {
    String name;
    public String getNameUpperCase() {
        return name.toUpperCase();
    }
}
// Call: new Student().getNameUpperCase()`,
    input_given: "new Student() — name field never set",
    expected_output: "\"\" or \"UNKNOWN\"",
    actual_output: "NullPointerException: Cannot invoke \"String.toUpperCase()\" because name is null",
    bug_type: "null_none_undefined",
    hint: "What is the default value of a String field in a Java class when not explicitly initialised?",
    explanation: "Unassigned String fields in Java default to null, not empty string. Calling .toUpperCase() on null throws a NullPointerException. Fix: initialise the field (String name = \"\";), or add a null check.",
    correct_keywords: ["null", "NullPointerException", "default value", "String", "initialise", "null check"],
    quick_picks: [
      "String fields default to null in Java — calling .toUpperCase() on null throws NPE",
      "name must be declared public to be accessible in a method",
      "toUpperCase() is not in the Java String API",
      "The method must be static to access instance variables"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_033",
    title: "Honour Student Check Inverted",
    language: "java",
    difficulty: "intermediate",
    category: "wrong_logical_operator",
    code_snippet: `public boolean isHonourStudent(int attendance, double gpa) {
    if (attendance >= 85 || gpa >= 3.5) {
        return true;
    }
    return false;
}
// Call: isHonourStudent(90, 2.8)`,
    input_given: "attendance=90, gpa=2.8",
    expected_output: "false (both conditions should be required)",
    actual_output: "true",
    bug_type: "wrong_logical_operator",
    hint: "The honour programme requires BOTH high attendance AND a high GPA — which operator enforces that?",
    explanation: "Using || (OR) means any one satisfied condition grants the award. With attendance=90 (>=85 is true), the OR short-circuits and returns true even though gpa=2.8 is below 3.5. Fix: change || to &&.",
    correct_keywords: ["||", "&&", "OR", "AND", "both conditions", "logical operator"],
    quick_picks: [
      "'||' makes either condition sufficient — use '&&' to require both",
      "90 >= 85 should be evaluated as false",
      "isHonourStudent needs a third parameter for exam marks",
      "Conditions should compare Strings not primitives"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_034",
    title: "Countdown Loop Goes Wrong Way",
    language: "java",
    difficulty: "intermediate",
    category: "infinite_loop",
    code_snippet: `public String buildCountdown(int n) {
    StringBuilder result = new StringBuilder();
    while (n > 0) {
        result.append(n).append(" ");
        n = n + 1;
    }
    return result.toString().trim();
}
// Call: buildCountdown(3)`,
    input_given: "n=3",
    expected_output: "\"3 2 1\"",
    actual_output: "Program hangs (infinite loop)",
    bug_type: "infinite_loop",
    hint: "For the loop to end, what direction must n move?",
    explanation: "n = n + 1 increments n rather than decrementing it. n starts at 3 and grows — the condition n > 0 is always true, creating an infinite loop. Fix: change n = n + 1 to n-- or n = n - 1.",
    correct_keywords: ["decrement", "n--", "n - 1", "increment", "infinite loop", "direction"],
    quick_picks: [
      "n grows instead of shrinking — condition n > 0 is always true",
      "StringBuilder.append() is not valid for integers in Java",
      "The loop condition should be n >= 0 not n > 0",
      "n should be reset to 0 inside the loop"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_035",
    title: "Switch Grade Falls Through",
    language: "java",
    difficulty: "intermediate",
    category: "variable_scope",
    code_snippet: `public String getGradeLabel(int score) {
    String label = "";
    switch (score / 10) {
        case 10:
        case 9:  label = "A";
        case 8:  label = "B";
        case 7:  label = "C";
        default: label = "F";
    }
    return label;
}
// Call: getGradeLabel(95)`,
    input_given: "score=95 → 95/10 = 9 → case 9",
    expected_output: "\"A\"",
    actual_output: "\"F\"",
    bug_type: "variable_scope",
    hint: "What happens to execution when a switch case has no break statement?",
    explanation: "Without break statements, Java's switch falls through — after matching case 9 and setting \"A\", execution continues into case 8 (\"B\"), case 7 (\"C\"), and default (\"F\"). Fix: add break; after each label assignment.",
    correct_keywords: ["fallthrough", "break", "switch", "case", "missing break", "fall-through"],
    quick_picks: [
      "Missing break causes execution to fall through all cases down to 'F'",
      "score / 10 uses integer division giving the wrong case number",
      "switch requires a String type, not an int expression",
      "default must appear before all numbered cases in Java"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_036",
    title: "Null Array Triggers NPE",
    language: "java",
    difficulty: "intermediate",
    category: "null_none_undefined",
    code_snippet: `public double computeAverage(double[] scores) {
    double sum = 0;
    for (double s : scores) {
        sum += s;
    }
    return sum / scores.length;
}
// Call: computeAverage(null)`,
    input_given: "null",
    expected_output: "0.0 or graceful return",
    actual_output: "NullPointerException",
    bug_type: "null_none_undefined",
    hint: "What happens when you attempt to iterate over a null array reference?",
    explanation: "Passing null as the array causes the enhanced for loop to throw a NullPointerException immediately when it attempts to access the object for iteration. Fix: add a null check at the start — if (scores == null) return 0.0;",
    correct_keywords: ["null", "NullPointerException", "null check", "null array", "enhanced for"],
    quick_picks: [
      "The for-each loop throws NPE when scores is null — add a null guard",
      "double[] cannot store null values",
      "Enhanced for loops require a minimum of one element",
      "sum / scores.length causes divide-by-zero"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_037",
    title: "Max Score Returns Too Early",
    language: "java",
    difficulty: "advanced",
    category: "return_missing",
    code_snippet: `public int findMaxScore(int[] scores) {
    int max = Integer.MIN_VALUE;
    for (int score : scores) {
        if (score > max) {
            max = score;
            return max;
        }
    }
    return -1;
}
// Call: findMaxScore(new int[]{72, 95, 88})`,
    input_given: "int[]{72, 95, 88}",
    expected_output: "95",
    actual_output: "72",
    bug_type: "return_missing",
    hint: "Where exactly inside the loop is return max placed — and what does that mean for the search?",
    explanation: "return max is inside the loop body. The first element (72) is greater than Integer.MIN_VALUE, so the function returns 72 immediately without looking at the other values. Fix: move return max; outside and after the loop.",
    correct_keywords: ["return inside loop", "early return", "loop completes", "placement", "after loop"],
    quick_picks: [
      "Integer.MIN_VALUE should be 0 as the starting max",
      "Enhanced for loop cannot update the max variable",
      "return max inside the loop exits on the first element — move it after the loop",
      "The function should use Arrays.sort() and return the last element"
    ],
    correct_quick_pick: 2
  },

  {
    id: "puzzle_038",
    title: "Integer Not Modified by Function",
    language: "java",
    difficulty: "advanced",
    category: "pass_by_value_reference",
    code_snippet: `public class ScoreUpdater {
    public void addBonus(int score, int bonus) {
        score = score + bonus;
    }

    public static void main(String[] args) {
        ScoreUpdater su = new ScoreUpdater();
        int studentScore = 75;
        su.addBonus(studentScore, 10);
        System.out.println(studentScore);
    }
}`,
    input_given: "studentScore=75, bonus=10",
    expected_output: "85",
    actual_output: "75",
    bug_type: "pass_by_value_reference",
    hint: "In Java, are primitive types like int passed into methods by value or by reference?",
    explanation: "Java always passes primitives by value. score inside addBonus is a copy of studentScore. Modifying the copy has zero effect on the original variable. Fix: change the method to return the new value.",
    correct_keywords: ["pass by value", "copy", "primitive", "int", "return value", "original unchanged"],
    quick_picks: [
      "int is passed by value — score is a copy; modifying it does not affect studentScore",
      "score + bonus should use the += operator",
      "addBonus must be declared static to access the outer variable",
      "Java passes all parameters by reference"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_039",
    title: "Substring Drops Last Character",
    language: "java",
    difficulty: "advanced",
    category: "off_by_one",
    code_snippet: `public String getFirstName(String fullName) {
    int space = fullName.indexOf(" ");
    return fullName.substring(0, space - 1);
}
// Call: getFirstName("Alice Johnson")`,
    input_given: "\"Alice Johnson\"",
    expected_output: "\"Alice\"",
    actual_output: "\"Alic\"",
    bug_type: "off_by_one",
    hint: "Is the end index in Java's substring() inclusive or exclusive?",
    explanation: "String.substring(start, end) uses an exclusive end index. \"Alice Johnson\".indexOf(\" \") returns 5. substring(0, 5) correctly returns \"Alice\" (indices 0–4). Using space - 1 = 4 returns \"Alic\". Fix: return fullName.substring(0, space).",
    correct_keywords: ["substring", "exclusive end", "off by one", "indexOf", "exclusive"],
    quick_picks: [
      "The substring end index is exclusive — space already excludes the space, no -1 needed",
      "indexOf returns -1 when no space is found",
      "substring start must be > 0",
      "Java substring uses 1-based indexing"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_040",
    title: "Integer Cache + Null Unboxing Trap",
    language: "java",
    difficulty: "expert",
    category: "multi_bug",
    code_snippet: `public class GradeChecker {
    Integer score;

    public boolean isTopScore(Integer target) {
        if (score == target) {
            return true;
        }
        return score > 100;
    }

    public static void main(String[] args) {
        GradeChecker gc = new GradeChecker();
        gc.score = 200;
        System.out.println(gc.isTopScore(200));
    }
}`,
    input_given: "score=200, target=200",
    expected_output: "true",
    actual_output: "false",
    bug_type: "multi_bug",
    hint: "Find two bugs: one related to Java's Integer caching range, and one involving auto-unboxing a potentially null value.",
    explanation: "Bug 1: Java caches Integer objects only for values -128 to 127. For 200, gc.score and target are separate object instances — == compares references and returns false. Use score.equals(target). Bug 2: score > 100 auto-unboxes score; if score were null this throws a NullPointerException.",
    correct_keywords: ["Integer cache", "-128 to 127", "equals()", "==", "auto-unboxing", "null", "reference"],
    quick_picks: [
      "Integer == fails outside cache range (-128..127); also risks NPE on null unboxing",
      "score should be declared as int not Integer",
      "Java Integer comparison requires explicit cast to long",
      "The constructor must initialise score before any method call"
    ],
    correct_quick_pick: 0
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // C++ PUZZLES  (041 – 050)
  // ─────────────────────────────────────────────────────────────────────────────

  {
    id: "puzzle_041",
    title: "Array Boundary Read",
    language: "cpp",
    difficulty: "beginner",
    category: "off_by_one",
    code_snippet: `int getLastGrade(int grades[], int size) {
    return grades[size];
}
// Call: int arr[] = {85, 90, 78}; getLastGrade(arr, 3);`,
    input_given: "grades={85, 90, 78}, size=3",
    expected_output: "78",
    actual_output: "Garbage value (undefined behavior — reads past array end)",
    bug_type: "off_by_one",
    hint: "If an array has 3 elements, what are its valid indices?",
    explanation: "C++ arrays are zero-indexed. An array of size 3 has valid indices 0, 1, 2. Accessing grades[size] reads grades[3] — one past the end — which is undefined behavior. Fix: return grades[size - 1].",
    correct_keywords: ["size - 1", "0-indexed", "out of bounds", "undefined behavior", "last index"],
    quick_picks: [
      "grades[size] reads one past the end — last valid index is size - 1",
      "C++ arrays index from 1 to size",
      "The size parameter must be reduced before passing to the function",
      "Undefined behavior only occurs with pointers, not plain arrays"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_042",
    title: "Level Condition Always True",
    language: "cpp",
    difficulty: "beginner",
    category: "assignment_vs_comparison",
    code_snippet: `bool isExpertLevel(int level) {
    if (level = 10) {
        return true;
    }
    return false;
}
// Call: isExpertLevel(3)`,
    input_given: "level=3",
    expected_output: "false",
    actual_output: "true",
    bug_type: "assignment_vs_comparison",
    hint: "Check the operator inside the if parentheses — what does a single = actually do in C++?",
    explanation: "level = 10 is an assignment that sets level to 10 and yields 10 as its value. Since 10 is non-zero (truthy), the condition always passes regardless of the original level. Fix: use level == 10.",
    correct_keywords: ["assignment", "==", "truthy", "single equals", "comparison", "10"],
    quick_picks: [
      "= assigns 10 to level — non-zero result is always truthy in a condition",
      "level must be const to be compared in an if statement",
      "C++ requires === for strict equality",
      "return true should be return level"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_043",
    title: "Uninitialised Bonus Variable",
    language: "cpp",
    difficulty: "beginner",
    category: "null_none_undefined",
    code_snippet: `int calculateBonus(int baseSalary) {
    int bonus;
    if (baseSalary > 50000) {
        bonus = 5000;
    }
    return bonus;
}
// Call: calculateBonus(30000)`,
    input_given: "baseSalary=30000",
    expected_output: "0 (or graceful fallback value)",
    actual_output: "Garbage value (undefined behavior)",
    bug_type: "null_none_undefined",
    hint: "What value does a local int variable hold in C++ before it is explicitly assigned?",
    explanation: "In C++, local variables are not zero-initialised. When baseSalary <= 50000, the if block is skipped and bonus is never set — it holds whatever garbage value was already in that memory location. Fix: initialise on declaration — int bonus = 0;",
    correct_keywords: ["uninitialized", "garbage value", "local variable", "initialize", "undefined behavior"],
    quick_picks: [
      "C++ initialises all local int variables to 0 automatically",
      "The if condition should use >= instead of >",
      "bonus must be declared as a global to persist its value",
      "Local variable 'bonus' holds garbage when the if branch is skipped — initialise to 0"
    ],
    correct_quick_pick: 3
  },

  {
    id: "puzzle_044",
    title: "Digit Sum Loop Never Ends",
    language: "cpp",
    difficulty: "intermediate",
    category: "infinite_loop",
    code_snippet: `int sumDigits(int n) {
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
    }
    return sum;
}
// Call: sumDigits(123)`,
    input_given: "n=123",
    expected_output: "6",
    actual_output: "Program hangs (infinite loop)",
    bug_type: "infinite_loop",
    hint: "For the loop to terminate, n must eventually reach 0 — what operation achieves that?",
    explanation: "n is never modified inside the loop body. n % 10 reads n but doesn't change it. n remains 123 forever and n > 0 is always true. Fix: add n /= 10; inside the loop to peel off the last digit each iteration.",
    correct_keywords: ["n /= 10", "infinite loop", "loop variable", "not updated", "digit", "divide"],
    quick_picks: [
      "n is never divided — it stays 123 every iteration and the loop never ends",
      "sum += n % 10 should be sum += n / 10",
      "The loop condition should be n != 0 not n > 0",
      "n must be reset to 0 before each digit is extracted"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_045",
    title: "Swap Function Does Nothing",
    language: "cpp",
    difficulty: "intermediate",
    category: "pass_by_value_reference",
    code_snippet: `#include <iostream>
using namespace std;

void swapScores(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int alice = 85, bob = 72;
    swapScores(alice, bob);
    cout << alice << " " << bob;
}`,
    input_given: "alice=85, bob=72",
    expected_output: "72 85",
    actual_output: "85 72 (unchanged)",
    bug_type: "pass_by_value_reference",
    hint: "Are a and b inside swapScores the original variables, or copies of them?",
    explanation: "a and b are passed by value — they are local copies. Swapping them inside swapScores has no effect on alice and bob in main(). Fix: change the signature to void swapScores(int& a, int& b) to pass by reference.",
    correct_keywords: ["pass by value", "reference", "int&", "copy", "original unchanged"],
    quick_picks: [
      "a and b are copies — swapping copies does not affect alice and bob",
      "The temp variable must be declared outside the function",
      "C++ cannot swap primitive types inside functions",
      "swapScores must return both values as a pair"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_046",
    title: "Enrolment Logic Lets Everyone In",
    language: "cpp",
    difficulty: "intermediate",
    category: "wrong_logical_operator",
    code_snippet: `bool canEnrol(int creditsEarned, bool hasPrerequisite) {
    if (creditsEarned >= 60 || !hasPrerequisite) {
        return true;
    }
    return false;
}
// Call: canEnrol(30, false)`,
    input_given: "creditsEarned=30, hasPrerequisite=false",
    expected_output: "false",
    actual_output: "true",
    bug_type: "wrong_logical_operator",
    hint: "Enrolment requires BOTH enough credits AND the prerequisite — which operator enforces that?",
    explanation: "Using || means enrolment passes when either condition is satisfied. !hasPrerequisite is true when hasPrerequisite is false, so a student without the prerequisite can still enrol. Fix: change || to && and check creditsEarned >= 60 && hasPrerequisite.",
    correct_keywords: ["||", "&&", "OR", "AND", "logical operator", "prerequisite"],
    quick_picks: [
      "'||' lets either condition pass — use '&&' and fix the prerequisite check",
      "creditsEarned should use > not >= for strict comparison",
      "!hasPrerequisite should be written as hasPrerequisite == false",
      "bool parameters should be 0 or 1 in C++"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_047",
    title: "Access Code Comparison Always Fails",
    language: "cpp",
    difficulty: "advanced",
    category: "string_vs_number",
    code_snippet: `#include <cstring>
using namespace std;

bool checkAccessCode(const char* code) {
    if (code == "ADMIN") {
        return true;
    }
    return false;
}
// char input[] = "ADMIN"; checkAccessCode(input);`,
    input_given: "char array containing \"ADMIN\"",
    expected_output: "true",
    actual_output: "false",
    bug_type: "string_vs_number",
    hint: "In C++, what does == compare when applied to two char pointers?",
    explanation: "Using == on char* pointers compares their memory addresses, not the string content. The pointer input and the literal \"ADMIN\" are at different addresses — == returns false even when the text is identical. Fix: use strcmp(code, \"ADMIN\") == 0.",
    correct_keywords: ["strcmp", "pointer comparison", "char*", "memory address", "string content"],
    quick_picks: [
      "== compares pointer addresses not string content — use strcmp() instead",
      "ADMIN must be stored in a char array before comparison",
      "const char* cannot be compared to string literals directly",
      "C++ requires string.compare() not == for text"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_048",
    title: "Grade Converter Returns Nothing",
    language: "cpp",
    difficulty: "advanced",
    category: "return_missing",
    code_snippet: `#include <iostream>
using namespace std;

double convertToGPA(int score) {
    if (score >= 90) return 4.0;
    if (score >= 80) return 3.0;
    if (score >= 70) return 2.0;
    if (score >= 60) return 1.0;
}

int main() {
    cout << convertToGPA(45) << endl;
}`,
    input_given: "score=45",
    expected_output: "0.0 (or default threshold output)",
    actual_output: "Undefined behavior (compiler dependent)",
    bug_type: "return_missing",
    hint: "What happens when score is below 60 and none of the if conditions fire?",
    explanation: "When score < 60, all four if conditions are false and the function exits without a return statement. In C++, flowing off the end of a non-void function is undefined behavior. Fix: add return 0.0; at the end.",
    correct_keywords: ["missing return", "undefined behavior", "all branches", "default return", "return 0.0"],
    quick_picks: [
      "No return for scores < 60 — reaching the end of a non-void function is UB in C++",
      "return 4.0 should use an int literal not a double",
      "Each if block needs an explicit else to prevent fallthrough",
      "C++ automatically returns 0 for double functions"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_049",
    title: "Recursive Power with Negative Exponent",
    language: "cpp",
    difficulty: "expert",
    category: "recursion_base_case",
    code_snippet: `int power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}
// Call: power(2, -3)`,
    input_given: "base=2, exp=-3",
    expected_output: "1 (or throws/handles negative boundaries)",
    actual_output: "Stack overflow — infinite recursion",
    bug_type: "recursion_base_case",
    hint: "Starting from -3 and subtracting 1 each call — does exp ever exactly hit 0?",
    explanation: "Starting from -3, exp goes to -4, -5, -6... It decreases without ever equalling 0, so the base case is never reached and the call stack overflows. Fix: change base case to if (exp <= 0) return 1;.",
    correct_keywords: ["base case", "negative exponent", "exp < 0", "stack overflow", "recursion", "guard"],
    quick_picks: [
      "exp decrements from -3 downward — never reaches 0; stack overflows",
      "exp - 1 should be exp + 1 for decreasing recursion",
      "power() needs a second base case for exp == 1",
      "Recursive functions cannot handle integer parameters in C++"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_050",
    title: "Dangling Pointer + Null Dereference",
    language: "cpp",
    difficulty: "expert",
    category: "multi_bug",
    code_snippet: `#include <iostream>
using namespace std;

int* getScore(bool passed) {
    if (passed) {
        int score = 100;
        return &score;
    }
    return nullptr;
}

int main() {
    int* result = getScore(true);
    cout << *result << endl;

    int* failed = getScore(false);
    cout << *failed << endl;
}`,
    input_given: "passed=true, then passed=false",
    expected_output: "100 then handled gracefully (e.g. print error)",
    actual_output: "Undefined behavior (dangling stack access) then Segmentation Fault",
    explanation: "Bug 1: score is a local variable on the stack — it is destroyed when getScore returns. The returned pointer is dangling, so *result is undefined behavior. Bug 2: failed is nullptr when passed=false. Dereferencing nullptr (*failed) causes a segmentation fault.",
    correct_keywords: ["dangling pointer", "local variable", "nullptr", "null check", "segfault", "lifetime"],
    quick_picks: [
      "Dangling pointer to destroyed local variable AND dereferencing nullptr without a check",
      "int* return type cannot hold integer values in C++",
      "nullptr must be cast to int* before use",
      "Local variable score needs to be declared static"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_051",
    title: "Class List Reference Copy",
    language: "python",
    difficulty: "intermediate",
    category: "pass_by_value_reference",
    code_snippet: `def clear_roster(active_roster):
    temp = active_roster
    temp.clear()

roster = ["Alice", "Bob", "Carol"]
clear_roster(roster)
print("Roster size:", len(roster))`,
    input_given: "List of 3 students passed to clear_roster",
    expected_output: "Roster size: 3",
    actual_output: "Roster size: 0",
    bug_type: "pass_by_value_reference",
    hint: "Does assigning one list variable to another create a new list or just copy the reference?",
    explanation: "In Python, assignment (=) copies reference pointers. `temp = active_roster` makes both names point to the same memory list object, so calling `temp.clear()` deletes everything in the caller's roster. Fix: copy explicitly with `temp = active_roster.copy()`.",
    correct_keywords: ["reference", "copy", "clear", "pointer", "mutability"],
    quick_picks: [
      "Assignment only copies the reference — clearing temp also clears roster",
      "temp.clear() fails because temp is a read-only view",
      "Roster size remains 3 because lists are passed by value in Python",
      "The global keyword is required to edit roster"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_052",
    title: "Double Float Precision check",
    language: "javascript",
    difficulty: "intermediate",
    category: "type_coercion",
    code_snippet: `function verifyCalculatedAverage(a, b) {
  return (a + b) === 0.3;
}

console.log(verifyCalculatedAverage(0.1, 0.2));`,
    input_given: "a=0.1, b=0.2",
    expected_output: "true",
    actual_output: "false",
    bug_type: "type_coercion",
    hint: "Computers use binary floating-point representation, which can cause tiny rounding anomalies.",
    explanation: "JavaScript floating-point numbers can suffer from rounding errors. In binary, 0.1 + 0.2 actually equals 0.30000000000000004, making it unequal to 0.3. A solution is to check if the difference is smaller than a tiny tolerance (Number.EPSILON).",
    correct_keywords: ["floating point", "precision", "rounding", "0.300000000", "float math", "binary representation"],
    quick_picks: [
      "Floating point math creates minor precision errors — use Number.EPSILON comparison",
      "Triple equals is invalid on floating-point primitives",
      "Numbers cannot be parsed by default during addition",
      "A return statement is missing inside the verify function"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_053",
    title: "Array Removal Loop skips Elements",
    language: "java",
    difficulty: "intermediate",
    category: "off_by_one",
    code_snippet: `public static void removeFailing(List<Integer> grades) {
    for (int i = 0; i < grades.size(); i++) {
        if (grades.get(i) < 50) {
            grades.remove(i);
        }
    }
}
// Call with list containing: [45, 48, 90]`,
    input_given: "List with grades [45, 48, 90]",
    expected_output: "[90]",
    actual_output: "[48, 90]",
    bug_type: "off_by_one",
    hint: "When you remove an element from a list, what happens to the indices of the remaining items?",
    explanation: "Removing an item shifts all subsequent elements left. When index 0 (45) is removed, 48 shifts to index 0, but the loop increments 'i' to 1 on the next cycle, skipping the inspection of 48. Fix: decrement i after removal (i--) or iterate backwards.",
    correct_keywords: ["index shift", "remove", "ArrayList", "skip", "off by one", "iteration"],
    quick_picks: [
      "Removing from a list shifts elements left, causing the next item to be skipped",
      "grades.remove(i) throws ConcurrentModificationException in plain for loops",
      "The comparison operator should be <= 50",
      "Java lists cannot be modified inside helper functions"
    ],
    correct_quick_pick: 0
  },

  {
    id: "puzzle_054",
    title: "Double Free Dangling pointer",
    language: "cpp",
    difficulty: "advanced",
    category: "null_none_undefined",
    code_snippet: `void freeStudentResource(int* resourcePtr) {
    delete resourcePtr;
    // ... code continues
    delete resourcePtr;
}`,
    input_given: "Valid dynamic heap pointer resourcePtr",
    expected_output: "Resources freed safely once without crashes",
    actual_output: "Crash (Double Free / Segmentation Fault)",
    bug_type: "null_none_undefined",
    hint: "What happens if you try to free/delete the same memory address twice?",
    explanation: "Calling delete on the same pointer twice causes a double free error (a type of undefined behavior/crash). After deletion, setting the pointer to nullptr is a safe practice because delete nullptr is a no-op. Fix: add `resourcePtr = nullptr;` after the first delete.",
    correct_keywords: ["double free", "dangling pointer", "delete", "nullptr", "undefined behavior"],
    quick_picks: [
      "Deleting the same pointer twice triggers a double free crash",
      "delete requires parentheses like delete(resourcePtr)",
      "Dynamic allocation pointers are read-only",
      "C++ does not allow deletion of integer pointers"
    ],
    correct_quick_pick: 0
  }

];

