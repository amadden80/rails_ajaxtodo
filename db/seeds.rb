Task.delete_all
Priority.delete_all

t01 = Task.create(name: 'Rescue Baby', desc: 'Get the baby out of the burning building', duedate: '2011-04-08')
t02 = Task.create(name: 'Rescue Cat', desc: 'Save Mittens from a horrible death', duedate: '2011-04-07')
t03 = Task.create(name: 'Do HW', desc: 'Get better at coding through practice', duedate: '2011-04-08')
t04 = Task.create(name: 'Obey', desc: 'Consume', duedate: '1984-12-12')
t05 = Task.create(name: 'Hide Kryptonite', desc: 'Do not let Lex find it', duedate: '2011-04-08')
t06 = Task.create(name: 'Write blog post', desc: 'Reflect on week and maintain online presence', duedate: '2011-04-08')
t07 = Task.create(name: 'Sleep well', desc: 'and carry a big stick', duedate: '2013-08-09')
t08 = Task.create(name: 'Fluff Pillow', desc: 'For maximum comfort', duedate: '2011-04-08')
t09 = Task.create(name: 'Eat Cheeseburger', desc: 'Whoa, this is important!', duedate: '2014-04-08')
t10 = Task.create(name: 'Fold Laundry', desc: 'So your clothes are less wrinkly', duedate: '2011-04-08')
t11 = Task.create(name: 'Fold Paper Airplane', desc: 'Also a paper aircraft control tower', duedate: '2011-04-10')
t12 = Task.create(name: 'Ride Dirty', desc: 'Rollin, no hatin', duedate: '2013-06-23')
t13 = Task.create(name: 'Learn PHP', desc: 'just kidding', duedate: '2013-04-13')
t14 = Task.create(name: 'Rescue Dog', desc: 'whatever', duedate: '3011-04-08')

p1 = Priority.create(name: 'Emergency', color: 'red', urgency_index: 11)
p2 = Priority.create(name: 'Urgent', color: 'orange', urgency_index: 9)
p3 = Priority.create(name: 'Important', color: 'yellow', urgency_index: 7)
p4 = Priority.create(name: 'Neutral', color: 'lightgreen', urgency_index: 5)
p5 = Priority.create(name: 'Casual', color: 'lightblue', urgency_index: 3)
p6 = Priority.create(name: 'Unimportant', color: 'grey', urgency_index: 1)

p1.tasks << t01 << t02
p2.tasks << t03 << t04 << t05
p3.tasks << t06 << t07
p4.tasks << t08 << t09 << t10
p5.tasks << t11 << t12
p6.tasks << t13 << t14
