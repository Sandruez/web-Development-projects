import mysql.connector as mysql

dataBase=mysql.connect(
    host='localhost',
    user='root',
    password='123456',

    auth_plugin='mysql_native_password'
  )
#prepare a cursor object
cursorObject=dataBase.cursor(buffered=True)

#Create a database
cursorObject.execute("CREATE DATABASE elderco")

print("all done!")