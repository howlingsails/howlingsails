// cap10typez-system-engineer-data.js
const commandCategories = {
  "sed commands": [
    {
      "command": "sed 's/error/issue/g' system_events.log",
      "description": "Replaces every instance of 'error' with 'issue' in system_events.log. Useful for standardizing error messages in log files."
    },
    {
      "command": "sed '/DEBUG/d' application.log",
      "description": "Deletes all lines containing 'DEBUG' from application.log. Use this command to remove debugging details from production logs."
    },
    {
      "command": "sed -n '20,40p' monthly_report.txt",
      "description": "Prints lines 20 through 40 from monthly_report.txt. Use this command when reviewing a specific section of a report."
    },
    {
      "command": "sed 's/username/USER_NAME/' user_accounts.txt > user_accounts_updated.txt",
      "description": "Replaces the first occurrence of 'username' with 'USER_NAME' in user_accounts.txt and outputs the result to user_accounts_updated.txt. Ideal for updating user account records without modifying the original file."
    },
    {
      "command": "sed 's/[[:space:]]\\+/,/g' data_export.txt",
      "description": "Converts consecutive whitespace characters in data_export.txt into a single comma. This is perfect for converting space-separated data into a CSV format."
    },
    {
      "command": "sed 's/^/INFO: /' system_log.txt",
      "description": "Adds the prefix 'INFO: ' to the beginning of every line in system_log.txt. Use this to tag log entries with additional context."
    },
    {
      "command": "sed 's/$/ -- end/' meeting_notes.txt",
      "description": "Appends ' -- end' to the end of each line in meeting_notes.txt. This helps clearly mark the end of each note or record."
    },
    {
      "command": "sed 's/[0-9]/#/g' account_numbers.txt",
      "description": "Replaces all digits in account_numbers.txt with '#'. Use this command to anonymize or mask sensitive numerical data."
    },
    {
      "command": "sed 's/$/ [verified]/' transaction_records.txt",
      "description": "Appends ' [verified]' to the end of every line in transaction_records.txt. This is useful for marking records as verified."
    },
    {
      "command": "sed -e 's/oldVersion/newVersion/g' -e 's/Deprecated/Updated/g' system_config.txt",
      "description": "Performs two substitutions in system_config.txt: replacing 'oldVersion' with 'newVersion' and 'Deprecated' with 'Updated'. Ideal for updating configuration files with multiple changes at once."
    }
  ],
  "bash commands": [
    {
      "command": "ls -l /var/log",
      "description": "Lists all files and directories within the /var/log directory, showing detailed information such as permissions, ownership, and file sizes. This is useful when you need to inspect system logs or verify file attributes in a standard location."
    },
    {
      "command": "cd /home/username/projects",
      "description": "Changes the current working directory to /home/username/projects. Use this command when you need to navigate to your projects folder to work on code or manage files."
    },
    {
      "command": "mkdir /home/username/new_project",
      "description": "Creates a new directory named 'new_project' in /home/username. This command is ideal for organizing files by starting a dedicated folder for a new project."
    },
    {
      "command": "rm -rf /home/username/old_backup",
      "description": "Recursively deletes the /home/username/old_backup directory and all of its contents without prompting for confirmation. Use this command with caution when permanently removing outdated backup files."
    },
    {
      "command": "cp /home/username/document.txt /home/username/document_backup.txt",
      "description": "Copies the file document.txt to document_backup.txt within /home/username, effectively creating a backup copy. This is useful when you want to safeguard your original document before making changes."
    },
    {
      "command": "mv /home/username/temp.txt /home/username/archive/",
      "description": "Moves temp.txt from /home/username to the /home/username/archive directory. This command helps organize files by relocating temporary or old files into an archive folder."
    },
    {
      "command": "cat /home/username/notes.txt",
      "description": "Outputs the contents of the notes.txt file located in /home/username to the terminal. This is a quick way to view file content without opening an editor."
    },
    {
      "command": "grep 'ERROR' /home/username/logs/app.log",
      "description": "Searches for the string 'ERROR' in /home/username/logs/app.log and displays each line containing it. This command is useful for quickly identifying problematic entries in application logs."
    },
    {
      "command": "ps aux",
      "description": "Displays a detailed list of all running processes on the system, including the user, CPU, and memory usage. This command is essential for monitoring system performance and diagnosing resource usage issues."
    },
    {
      "command": "top",
      "description": "Opens the top utility to provide a real-time view of system performance, including active processes, CPU load, and memory usage. This tool is ideal for live system monitoring during troubleshooting."
    },
    {
      "command": "chmod 755 /home/username/scripts/deploy.sh",
      "description": "Modifies the permissions of deploy.sh in /home/username/scripts to allow the owner full access (read, write, execute) and read and execute permissions to group members and others. This ensures the script is executable by those who need to run it."
    },
    {
      "command": "tar -cvf /home/username/backups/project_backup.tar /home/username/projects/my_project",
      "description": "Creates a tar archive named project_backup.tar from the contents of /home/username/projects/my_project. This command is useful for bundling and backing up project files before deploying or making major changes."
    },
    {
      "command": "find /home/username -name '*.txt'",
      "description": "Searches through /home/username and all its subdirectories for files ending with .txt. This command is practical for quickly locating text files scattered throughout your home directory."
    },
    {
      "command": "df -h",
      "description": "Displays the disk space usage for all mounted filesystems in a human-readable format, allowing you to easily assess available storage on your system."
    },
    {
      "command": "du -sh /home/username/*",
      "description": "Calculates and displays the total disk usage of each file and directory in /home/username in a summarized format. This helps in identifying which directories consume the most space."
    },
    {
      "command": "echo 'Hello, World!' > /home/username/hello.txt",
      "description": "Writes the text 'Hello, World!' into /home/username/hello.txt, creating the file if it does not already exist. This command is useful for testing file output and verifying write permissions."
    },
    {
      "command": "history",
      "description": "Displays a complete list of commands executed during the current shell session, which can be used to recall previous commands or troubleshoot command history."
    },
    {
      "command": "alias ll='ls -l'",
      "description": "Creates an alias 'll' for the command 'ls -l', simplifying the process of executing detailed file listings. This alias is especially useful for users who frequently check file details."
    },
    {
      "command": "sudo apt-get update",
      "description": "Updates the package lists for upgrades and new package installations on a Debian-based system, ensuring that the system has the latest information on available software versions."
    }
  ],
  "grep commands": [
    {
      "command": "grep 'CRITICAL' /var/log/system.log",
      "description": "Searches for the term 'CRITICAL' in /var/log/system.log and prints every matching line. Use this command to quickly locate severe error messages in your system logs."
    },
    {
      "command": "grep -i 'warning' /var/log/system.log",
      "description": "Performs a case-insensitive search for 'warning' in /var/log/system.log. This is useful when the case of the letters may vary in the log entries."
    },
    {
      "command": "grep -r 'timeout' /etc/",
      "description": "Recursively searches all files under the /etc/ directory for the word 'timeout'. Ideal for finding configuration files that contain timeout settings."
    },
    {
      "command": "grep -l 'failed' /home/username/logs/*.log",
      "description": "Scans all .log files in /home/username/logs and outputs only the names of files that contain the word 'failed'. This helps quickly identify logs with failure events."
    },
    {
      "command": "grep -v 'DEBUG' /home/username/logs/application.log",
      "description": "Prints all lines from /home/username/logs/application.log that do not contain 'DEBUG'. Use this command to filter out verbose debug messages from your application log."
    },
    {
      "command": "grep -c 'error' /var/log/apache2/error.log",
      "description": "Counts the number of lines containing 'error' in /var/log/apache2/error.log. This command is useful for quantifying error occurrences in your Apache logs."
    },
    {
      "command": "grep -w 'SUCCESS' /var/log/deployment.log",
      "description": "Searches for the exact word 'SUCCESS' in /var/log/deployment.log, ensuring that partial matches are excluded. This is ideal for verifying successful deployment logs."
    },
    {
      "command": "grep -n 'Exception' /home/username/app/errors.log",
      "description": "Displays each line from /home/username/app/errors.log that contains 'Exception', along with the corresponding line numbers. This aids in quickly pinpointing issues in the error log."
    },
    {
      "command": "grep -o 'User [0-9]\\+' /var/log/auth.log",
      "description": "Extracts and prints only the matching portions that conform to the regular expression 'User [0-9]\\+' in /var/log/auth.log. Use this command to isolate user IDs from authentication logs."
    },
    {
      "command": "grep -e 'timeout' -e 'connection refused' /etc/network/config.txt",
      "description": "Searches /etc/network/config.txt for lines containing either 'timeout' or 'connection refused'. This is particularly useful for troubleshooting network configuration issues."
    },
    {
      "command": "grep --color=auto 'fatal' /var/log/mysql/error.log",
      "description": "Searches for the word 'fatal' in /var/log/mysql/error.log and highlights it in color. This enhances visibility when scanning through database error logs."
    },
    {
      "command": "grep -P '\\d{4}-\\d{2}-\\d{2}' /var/log/backup.log",
      "description": "Utilizes Perl-compatible regular expressions to search for dates in the YYYY-MM-DD format within /var/log/backup.log. Use this to extract or verify date entries in backup logs."
    },
    {
      "command": "grep -A 3 'Start Process' /home/username/logs/process.log",
      "description": "Prints the matching line containing 'Start Process' from /home/username/logs/process.log along with the 3 subsequent lines. This provides context for events that follow the process start."
    },
    {
      "command": "grep -B 3 'Shutdown' /home/username/logs/system.log",
      "description": "Displays the 3 lines preceding any occurrence of 'Shutdown' in /home/username/logs/system.log. This command is useful for gathering context prior to system shutdown events."
    },
    {
      "command": "grep -C 3 'Update Complete' /var/log/update.log",
      "description": "Shows the matching line and 3 lines of context before and after it in /var/log/update.log. Use this command when you need a detailed view around update completion events."
    },
    {
      "command": "grep -f /home/username/config/patterns.txt /var/log/service.log",
      "description": "Reads multiple search patterns from /home/username/config/patterns.txt and searches for them in /var/log/service.log. This is useful for scanning logs using a predefined set of criteria."
    },
    {
      "command": "grep -z 'session' /home/username/logs/binary_log.dat",
      "description": "Searches for the term 'session' in a binary file /home/username/logs/binary_log.dat where records are null-separated. Use this command when dealing with binary logs or non-text data."
    },
    {
      "command": "grep -F 'SUCCESS' /home/username/app/deployment.log",
      "description": "Performs a literal search for 'SUCCESS' in /home/username/app/deployment.log without interpreting the pattern as a regular expression. This is ideal when the search string contains characters that could be misinterpreted in regex."
    }
  ],
  "awk commands": [
        {
          "command": "awk '{print $1}' /home/username/data/sales_data.txt",
          "description": "Prints the first column from each line in /home/username/data/sales_data.txt, useful for extracting identifiers like product IDs from a structured dataset."
        },
        {
          "command": "awk '{print $1, $3}' /home/username/data/sales_data.txt",
          "description": "Prints the first and third columns from /home/username/data/sales_data.txt, ideal for extracting specific fields such as product IDs and their corresponding prices."
        },
        {
          "command": "awk '/error/ {print $0}' /var/log/application.log",
          "description": "Searches for lines containing 'error' in /var/log/application.log and prints them, making it easier to filter out error messages in application logs."
        },
        {
          "command": "awk '{print NR, $0}' /home/username/logs/server.log",
          "description": "Prints each line of /home/username/logs/server.log prefixed with its line number, which is helpful for debugging and referencing specific log entries."
        },
        {
          "command": "awk '{if ($1 > 100) print $0}' /home/username/data/temperature_readings.txt",
          "description": "Prints lines from /home/username/data/temperature_readings.txt where the first column exceeds 100, useful for spotting extreme temperature readings."
        },
        {
          "command": "awk '{sum += $1} END {print sum}' /home/username/data/sales_data.txt",
          "description": "Calculates the sum of the values in the first column of /home/username/data/sales_data.txt, which can be used to compute total sales or revenue from numerical data."
        },
        {
          "command": "awk 'BEGIN {FS=\":\"} {print $1}' /etc/passwd",
          "description": "Sets the field separator to ':' and prints the first field from /etc/passwd, typically used to list all usernames on a Unix system."
        },
        {
          "command": "awk '{print $1, $2}' /home/username/data/inventory.txt | sort",
          "description": "Extracts the first two columns from /home/username/data/inventory.txt and sorts the output alphabetically, helping to organize inventory data by ID and description."
        },
        {
          "command": "awk 'NR==2 {print $0}' /home/username/documents/report.txt",
          "description": "Prints only the second line of /home/username/documents/report.txt, which may be useful for previewing header information or summary data in a report."
        },
        {
          "command": "awk '{print $1 * $2}' /home/username/data/multiplication_data.txt",
          "description": "Multiplies the first and second columns in /home/username/data/multiplication_data.txt and prints the result, ideal for performing quick arithmetic on paired data values."
        },
        {
          "command": "awk 'BEGIN {OFS=\"-\"} {print $1, $2}' /home/username/data/coordinates.txt",
          "description": "Sets the output field separator to '-' and prints the first two columns from /home/username/data/coordinates.txt, useful for formatting coordinate pairs in a custom style."
        },
        {
          "command": "awk '{if ($1 == \"John\") print $0}' /home/username/data/employee_list.txt",
          "description": "Prints all lines from /home/username/data/employee_list.txt where the first column equals 'John', assisting in filtering records for a specific employee."
        },
        {
          "command": "awk 'END {print NR}' /home/username/data/transaction_log.txt",
          "description": "Prints the total number of lines in /home/username/data/transaction_log.txt, which is useful for quickly determining the record count of a log file."
        },
        {
          "command": "awk '{print $1, $3}' /home/username/data/financial_report.txt | sort -n",
          "description": "Extracts the first and third columns from /home/username/data/financial_report.txt and sorts the output numerically, ideal for organizing financial data by numerical values."
        },
        {
          "command": "awk '{print $1, $2, $3}' /home/username/data/duplicate_entries.txt | uniq",
          "description": "Prints the first three columns from /home/username/data/duplicate_entries.txt and removes duplicate lines, helping to clean up repeated records."
        },
        {
          "command": "awk '{print $1 * 2}' /home/username/data/sales_figures.txt > /home/username/data/doubled_sales.txt",
          "description": "Doubles the value in the first column of /home/username/data/sales_figures.txt and writes the result to /home/username/data/doubled_sales.txt, which is useful for scaling numerical data quickly."
        },
        {
          "command": "awk '{if ($1 > 10 && $2 < 20) print $0}' /home/username/data/measurement_data.txt",
          "description": "Prints lines from /home/username/data/measurement_data.txt where the first column is greater than 10 and the second column is less than 20, allowing for filtering based on multiple conditions."
        },
        {
          "command": "awk '{gsub(/ERROR/, \"FIXED\"); print $0}' /home/username/logs/system_errors.log",
          "description": "Replaces all occurrences of 'ERROR' with 'FIXED' in /home/username/logs/system_errors.log and prints the modified lines, useful for reformatting log entries to indicate resolved issues."
        }
      ],
  "linux commands": [
    {
      "command": "curl -O http://downloads.example.com/software/update.zip",
      "description": "Downloads the update.zip file from downloads.example.com and saves it to the current directory. Use this command when you need to retrieve software updates directly from a specified URL."
    },
    {
      "command": "wget http://downloads.example.com/software/update.zip",
      "description": "Fetches the update.zip file from downloads.example.com using wget. This command is ideal if you prefer wget for downloading files."
    },
    {
      "command": "scp alice@server.example.com:/var/backups/database_backup.sql /home/alice/backups/",
      "description": "Securely copies the database_backup.sql file from the remote server's /var/backups directory to the local /home/alice/backups/ directory. Use this command to transfer backup files safely."
    },
    {
      "command": "ssh alice@server.example.com 'ls -l /var/www/html'",
      "description": "Logs into server.example.com as user alice and lists detailed information about files in the /var/www/html directory. This command is useful for remotely inspecting website files."
    },
    {
      "command": "ssh alice@server.example.com 'tar -cvf /tmp/project_archive.tar /var/www/project'",
      "description": "SSH into server.example.com as alice and create a tar archive of the /var/www/project directory, saving it as /tmp/project_archive.tar. Use this command to package project files for backup or transfer."
    },
    {
      "command": "scp /home/alice/documents/report.pdf alice@server.example.com:/var/www/html/reports/",
      "description": "Transfers the report.pdf file from the local /home/alice/documents/ directory to the remote server's /var/www/html/reports/ directory. Ideal for publishing documents to a web server."
    },
    {
      "command": "curl -X POST -d 'username=alice&action=login' http://api.example.com/auth",
      "description": "Sends a POST request with login data for user alice to http://api.example.com/auth. This command is useful for automating API authentication processes."
    },
    {
      "command": "curl -H 'Authorization: Bearer abc123token' http://api.example.com/data",
      "description": "Makes an authenticated GET request to http://api.example.com/data using a Bearer token. Use this command to access protected API endpoints."
    },
    {
      "command": "wget -r -np http://mirror.example.com/software/",
      "description": "Recursively downloads files from http://mirror.example.com/software/ without following links to parent directories. This command is useful for mirroring directories from a web server."
    },
    {
      "command": "ssh alice@server.example.com 'sudo systemctl restart nginx' && ssh alice@server.example.com 'systemctl status nginx'",
      "description": "Restarts the nginx service on the remote server and immediately checks its status. Use this command for quick service maintenance and to verify that the restart was successful."
    }
  ],
  "File management commands>": [
    {
      "command": "ls -la /home/username/documents",
      "description": "Lists all files and directories (including hidden files) in /home/username/documents with detailed information such as permissions and file sizes. Useful for verifying directory contents."
    },
    {
      "command": "cd /var/log/nginx",
      "description": "Changes the current directory to /var/log/nginx where Nginx logs are stored, enabling you to inspect and manage these log files."
    },
    {
      "command": "mkdir /home/username/projects/new_app",
      "description": "Creates a new directory called 'new_app' within /home/username/projects to organize files related to a new application project."
    },
    {
      "command": "rmdir /home/username/old_configs",
      "description": "Removes the empty directory /home/username/old_configs, helping to clean up unused configuration folders."
    },
    {
      "command": "cp /home/username/projects/new_app/config.sample.json /home/username/projects/new_app/config.json",
      "description": "Copies a sample configuration file to a new file named config.json in the new_app directory, initializing project settings without altering the original sample."
    },
    {
      "command": "mv /home/username/downloads/old_report.pdf /home/username/documents/archive/",
      "description": "Moves old_report.pdf from the downloads folder to the documents/archive directory, aiding in organizing outdated reports."
    },
    {
      "command": "rm -f /home/username/temp/debug.log",
      "description": "Forcefully deletes the debug.log file located in /home/username/temp without prompting, useful for clearing unnecessary temporary log files."
    },
    {
      "command": "find /home/username -type f -name '*.backup'",
      "description": "Recursively searches through /home/username for all files ending with .backup, assisting in locating backup files across multiple directories."
    },
    {
      "command": "tar -xzvf /home/username/downloads/archive.tar.gz -C /home/username/documents/",
      "description": "Extracts the contents of archive.tar.gz into /home/username/documents, which is helpful for unpacking compressed files into a designated folder."
    },
    {
      "command": "tar -cvf /home/username/backups/weekly_backup.tar /home/username/projects/new_app",
      "description": "Creates a tar archive named weekly_backup.tar from the new_app directory, ideal for regular backups of your project data."
    }
  ],
  "python basic": [
    {
      "command": "squared_numbers = [i**2 for i in range(10)]",
      "description": "Creates a list of squared numbers from 0 to 9 using list comprehension."
    },
    {
      "command": "sorted_fruits = sorted(['banana', 'apple', 'cherry'])",
      "description": "Sorts a list of fruit names alphabetically."
    },
    {
      "command": "even_numbers = [num for num in range(20) if num % 2 == 0]",
      "description": "Generates a list of even numbers from 0 to 19."
    },
    {
      "command": "person = {'name': 'Alice', 'age': 25}",
      "description": "Creates a dictionary representing a person with name and age."
    },
    {
      "command": "hello_length = len('Hello World')",
      "description": "Calculates the number of characters in the string 'Hello World'."
    },
    {
      "command": "upper_case_language = 'Python'.upper()",
      "description": "Converts 'Python' to uppercase."
    },
    {
      "command": "clean_text = '  strip whitespace  '.strip()",
      "description": "Removes extra spaces from the beginning and end of a string."
    },
    {
      "command": "numbers = list(map(int, ['1', '2', '3']))",
      "description": "Converts a list of string digits to integers."
    },
    {
      "command": "divisible_by_three = [num for num in range(100) if num % 3 == 0]",
      "description": "Generates a list of numbers from 0 to 99 that are divisible by 3."
    },
    {
      "command": "total_sum = sum([1, 2, 3, 4])",
      "description": "Calculates the sum of a list of numbers."
    },
    {
      "command": "max_value = max([10, 20, 5, 8])",
      "description": "Finds the maximum number in a list."
    },
    {
      "command": "min_value = min([10, 20, 5, 8])",
      "description": "Finds the minimum number in a list."
    },
    {
      "command": "range_list = list(range(5, 20, 3))",
      "description": "Creates a list of numbers from 5 to 19, counting by 3."
    },
    {
      "command": "rounded_value = round(123.456, 2)",
      "description": "Rounds the number 123.456 to two decimal places."
    },
    {
      "command": "absolute_value = abs(-10)",
      "description": "Calculates the absolute value of -10."
    },
    {
      "command": "consonants = [char for char in 'python' if char not in 'aeiou']",
      "description": "Creates a list of consonants from the string 'python' by filtering out vowels."
    },
    {
      "command": "paired_list = list(zip(['a', 'b'], [1, 2]))",
      "description": "Pairs elements from two lists into tuples."
    },
    {
      "command": "squares_dict = {num: num**2 for num in range(5)}",
      "description": "Creates a dictionary where keys are numbers from 0 to 4 and values are their squares."
    },
    {
      "command": "all_true = all([True, False, True])",
      "description": "Checks if all values in the list are True; returns False in this case."
    },
    {
      "command": "any_true = any([True, False, True])",
      "description": "Checks if at least one value in the list is True; returns True."
    },
    {
      "command": "greeting = 'Hello, {name}!'.format(name='World')",
      "description": "Formats the string by inserting 'World' into the placeholder {name}."
    },
    {
      "command": "number_list = [*range(5)]",
      "description": "Expands a range into a list of numbers from 0 to 4."
    },
    {
      "command": "incremented_value = (lambda x: x + 10)(5)",
      "description": "Applies a lambda function to add 10 to 5, resulting in 15."
    },
    {
      "command": "sorted_by_length = sorted(['apple', 'banana', 'cherry'], key=len)",
      "description": "Sorts a list of strings by the length of each string."
    },
    {
      "command": "filtered_numbers = list(filter(lambda x: x > 10, [5, 15, 25]))",
      "description": "Filters a list to include only numbers greater than 10."
    },
    {
      "command": "odd_squares = [num**2 for num in range(10) if num % 2 != 0]",
      "description": "Creates a list of squares for odd numbers from 0 to 9."
    },
    {
      "command": "unique_fruits = {'apple', 'banana', 'cherry'}",
      "description": "Creates a set of unique fruit names."
    },
    {
      "command": "ascii_dict = {i: chr(65 + i) for i in range(5)}",
      "description": "Creates a dictionary mapping numbers to their corresponding uppercase ASCII letters."
    },
    {
      "command": "str_numbers = list(map(str, [1, 2, 3]))",
      "description": "Converts a list of numbers into a list of strings."
    },
    {
      "command": "odd_numbers = [num for num in range(20) if num % 2 == 1]",
      "description": "Creates a list of odd numbers from 0 to 19."
    },
    {
      "command": "unique_char_count = len(set('hello'))",
      "description": "Calculates the number of unique characters in the string 'hello'."
    },
    {
      "command": "even_numbers_set = {num for num in range(10) if num % 2 == 0}",
      "description": "Creates a set of even numbers from 0 to 9."
    },
    {
      "command": "first_element = next(iter(['a', 'b', 'c']))",
      "description": "Retrieves the first element from the iterable."
    },
    {
      "command": "all_longer_than_three = all([len(word) > 3 for word in ['apple', 'bat', 'cat']])",
      "description": "Checks if every word in the list has more than three characters."
    },
    {
      "command": "contains_digit = any(char.isdigit() for char in 'abc123')",
      "description": "Determines if any character in the string 'abc123' is a digit."
    },
    {
      "command": "sorted_reverse = sorted(['x', 'a', 'z', 'b'], reverse=True)",
      "description": "Sorts a list of characters in reverse alphabetical order."
    },
    {
      "command": "halved_values = [num / 2 for num in range(5)]",
      "description": "Creates a list by dividing each number from 0 to 4 by 2."
    },
    {
      "command": "multiplied_dict = {num: num * 10 for num in range(5)}",
      "description": "Creates a dictionary where each key is a number and its value is that number multiplied by 10."
    },
    {
      "command": "word_length = {word: len(word) for word in ['apple', 'bat', 'cat']}",
      "description": "Creates a dictionary that maps each word to its length."
    },
    {
      "command": "reversed_tuple = tuple(reversed((1, 2, 3)))",
      "description": "Creates a tuple with the elements of (1, 2, 3) in reverse order."
    },
    {
      "command": "summed_pairs = [x + y for x, y in zip([1, 2], [3, 4])]",
      "description": "Sums corresponding elements from two lists and returns a new list of the results."
    },
    {
      "command": "cubes_dict = {num: num**3 for num in range(5)}",
      "description": "Creates a dictionary where keys are numbers from 0 to 4 and values are their cubes."
    },
    {
      "command": "reversed_list = list(reversed(range(5)))",
      "description": "Generates a list of numbers from 4 down to 0 in descending order."
    },
    {
      "command": "animals_by_length = sorted(['zebra', 'elephant', 'cat'], key=len)",
      "description": "Sorts a list of animal names based on the length of each name."
    },
    {
      "command": "divisible_by_three = [num for num in range(10) if num % 3 == 0]",
      "description": "Generates a list of numbers from 0 to 9 that are divisible by 3."
    },
    {
      "command": "letter_count = 'hello'.count('l')",
      "description": "Counts the occurrences of the letter 'l' in the string 'hello'."
    },
    {
      "command": "replaced_string = 'python'.replace('on', 'OFF')",
      "description": "Replaces the substring 'on' with 'OFF' in the string 'python'."
    },
    {
      "command": "even_filtered = list(filter(lambda x: x % 2 == 0, range(10)))",
      "description": "Filters a range of numbers to include only even numbers."
    }
  ],
    "python numpy": [
      {
        "command": "import numpy as np",
        "description": "Imports the numpy library as 'np'. Place this at the top of your script (e.g., data_analysis.py) to access numpy's array and math functions."
      },
      {
        "command": "numbers_array = np.array([1, 2, 3])",
        "description": "Creates a 1D numpy array called numbers_array from a list. Use this for basic numeric operations."
      },
      {
        "command": "zeros_matrix = np.zeros((2, 3))",
        "description": "Initializes a 2x3 matrix filled with zeros, ideal for setting up an empty matrix in simulation.py."
      },
      {
        "command": "ones_matrix = np.ones((3, 2))",
        "description": "Generates a 3x2 matrix where every element is one. This can be used for constant value matrices in calculations."
      },
      {
        "command": "identity_matrix = np.eye(4)",
        "description": "Creates a 4x4 identity matrix, useful in linear_algebra.py for operations requiring an identity matrix."
      },
      {
        "command": "linear_space = np.linspace(0, 10, 5)",
        "description": "Generates an array of 5 evenly spaced values between 0 and 10. This is perfect for plotting or sampling in data_visualization.py."
      },
      {
        "command": "even_numbers = np.arange(0, 10, 2)",
        "description": "Creates an array of even numbers from 0 to 8 using a step of 2. Ideal for generating predictable numeric sequences."
      },
      {
        "command": "random_floats = np.random.rand(2, 3)",
        "description": "Produces a 2x3 array of random floats between 0 and 1. Use this in model_initialization.py to simulate random data."
      },
      {
        "command": "random_int_matrix = np.random.randint(0, 10, (3, 3))",
        "description": "Generates a 3x3 matrix with random integers from 0 to 9. Suitable for testing algorithms in statistical_analysis.py."
      },
      {
        "command": "filled_matrix = np.full((2, 3), 7)",
        "description": "Creates a 2x3 matrix where each element is 7, useful for initializing matrices with a constant value."
      },
      {
        "command": "average_value = np.mean(np.array([1, 2, 3]))",
        "description": "Calculates the mean of the array [1, 2, 3]. Use this in data_summary.py to quickly compute averages."
      },
      {
        "command": "total_sum = np.sum(np.array([1, 2, 3]))",
        "description": "Sums all elements of the array [1, 2, 3]. Ideal for aggregate calculations in financial_model.py."
      },
      {
        "command": "max_value = np.max(np.array([1, 2, 3]))",
        "description": "Determines the maximum value in the array [1, 2, 3]. Use this in analytics.py to identify peak values."
      },
      {
        "command": "min_value = np.min(np.array([1, 2, 3]))",
        "description": "Determines the minimum value in the array [1, 2, 3]. This is useful for setting lower bounds in data_analysis.py."
      },
      {
        "command": "dot_product = np.dot(np.array([1, 2]), np.array([3, 4]))",
        "description": "Computes the dot product of two arrays. Essential for vector operations in machine_learning.py."
      },
      {
        "command": "transposed_matrix = np.transpose(np.array([[1, 2], [3, 4]]))",
        "description": "Transposes a 2x2 matrix, swapping rows and columns. Use this in linear_algebra.py to adjust matrix dimensions."
      },
      {
        "command": "reshaped_array = np.reshape(np.arange(12), (3, 4))",
        "description": "Reshapes a 1D array of 12 elements into a 3x4 matrix. This is useful for restructuring data in data_manipulation.py."
      },
      {
        "command": "sqrt_values = np.sqrt(np.array([1, 4, 9]))",
        "description": "Calculates the square root of each element in the array [1, 4, 9]. Ideal for mathematical transformations in scientific_computing.py."
      },
      {
        "command": "concatenated_array = np.concatenate((np.array([1, 2]), np.array([3, 4])))",
        "description": "Merges two 1D arrays into one. Use this in data_merging.py when you need to combine arrays."
      },
      {
        "command": "horizontal_stack = np.hstack((np.array([1, 2]), np.array([3, 4])))",
        "description": "Horizontally stacks two arrays side-by-side. This is useful for combining columns in image_processing.py."
      },
      {
        "command": "vertical_stack = np.vstack((np.array([1, 2]), np.array([3, 4])))",
        "description": "Vertically stacks two arrays on top of each other. Use this to merge rows in data_integration.py."
      },
      {
        "command": "scaled_array = np.array([1, 2, 3]) * 2",
        "description": "Multiplies each element in the array by 2, scaling the array element-wise. Ideal for simple arithmetic adjustments."
      },
      {
        "command": "sum_array = np.array([1, 2, 3]) + np.array([4, 5, 6])",
        "description": "Adds two arrays element-wise, resulting in a new array with summed values. Useful for vector addition in numerical_computations.py."
      },
      {
        "command": "divided_array = np.array([1, 2, 3]) / 2",
        "description": "Divides each element in the array by 2, performing element-wise division. Use this for scaling data in normalization tasks."
      }
    ],
  "python pandas": [
    {
      "command": "import pandas as pd",
      "description": "Imports the pandas library as pd, enabling data manipulation and analysis functions throughout your script."
    },
    {
      "command": "customer_df = pd.DataFrame({\"CustomerID\": [101, 102], \"PurchaseAmount\": [250.0, 150.0]})",
      "description": "Creates a DataFrame named customer_df with customer IDs and their purchase amounts. Use this when manually constructing small datasets."
    },
    {
      "command": "sales_df = pd.read_csv('data/sales_data.csv')",
      "description": "Reads sales data from the CSV file located at data/sales_data.csv into a DataFrame named sales_df for further analysis."
    },
    {
      "command": "sales_df.head()",
      "description": "Displays the first five rows of sales_df to quickly inspect the dataset's structure and contents."
    },
    {
      "command": "sales_df.tail(3)",
      "description": "Shows the last three rows of sales_df, useful for verifying the tail end of the dataset."
    },
    {
      "command": "sales_df.describe()",
      "description": "Generates descriptive statistics (e.g., mean, std, min, max) for numeric columns in sales_df to summarize data distribution."
    },
    {
      "command": "sales_df.info()",
      "description": "Prints a concise summary of sales_df including column data types and non-null counts, aiding in data quality assessment."
    },
    {
      "command": "sales_df['TotalSale'] = sales_df['Quantity'] * sales_df['UnitPrice']",
      "description": "Creates a new column 'TotalSale' by multiplying 'Quantity' and 'UnitPrice' for each row in sales_df to calculate total sales per transaction."
    },
    {
      "command": "sales_df['SaleCategory'] = sales_df['TotalSale'].apply(lambda x: 'High' if x > 500 else 'Low')",
      "description": "Adds a 'SaleCategory' column to sales_df, categorizing each sale as 'High' or 'Low' based on the TotalSale value."
    },
    {
      "command": "sales_df = sales_df.drop('Discount', axis=1)",
      "description": "Removes the 'Discount' column from sales_df when it is not required for further analysis."
    },
    {
      "command": "sales_df = sales_df.rename(columns={\"CustomerID\": \"CustID\", \"TotalSale\": \"SaleTotal\"})",
      "description": "Renames columns in sales_df for clarity, such as changing 'CustomerID' to 'CustID' and 'TotalSale' to 'SaleTotal'."
    },
    {
      "command": "sorted_sales_df = sales_df.sort_values(by='SaleTotal')",
      "description": "Sorts sales_df in ascending order based on the 'SaleTotal' column, useful for identifying lower sales figures."
    },
    {
      "command": "high_sales_df = sales_df[sales_df['SaleTotal'] > 500]",
      "description": "Filters sales_df to create high_sales_df containing only transactions where 'SaleTotal' exceeds 500."
    },
    {
      "command": "sales_df = sales_df.fillna(0)",
      "description": "Fills any missing values in sales_df with 0 to ensure clean numeric operations during analysis."
    },
    {
      "command": "combined_df = pd.concat([january_df, february_df])",
      "description": "Concatenates two DataFrames (e.g., january_df and february_df) vertically into combined_df for multi-month sales analysis."
    },
    {
      "command": "merged_df = pd.merge(customer_df, order_df, on='CustomerID')",
      "description": "Merges customer_df with order_df on the 'CustomerID' column, combining customer details with their corresponding orders."
    },
    {
      "command": "sales_df.to_csv('reports/sales_summary.csv', index=False)",
      "description": "Exports sales_df to a CSV file at reports/sales_summary.csv without including the DataFrame index, ideal for sharing clean reports."
    },
    {
      "command": "sales_df['SaleTotal'] = sales_df['SaleTotal'].astype(float)",
      "description": "Converts the 'SaleTotal' column in sales_df to float to ensure proper numeric formatting for calculations."
    },
    {
      "command": "sales_df['SaleTotal'] = sales_df['SaleTotal'].replace({0: None})",
      "description": "Replaces zero values in the 'SaleTotal' column with None, treating them as missing data if zeros are invalid."
    },
    {
      "command": "sales_df['CumulativeSales'] = sales_df['SaleTotal'].cumsum()",
      "description": "Adds a 'CumulativeSales' column to sales_df that shows the running total of sales, useful for trend analysis over time."
    },
    {
      "command": "pivot_table = sales_df.pivot_table(index='Region', columns='Product', values='SaleTotal', aggfunc='sum')",
      "description": "Creates a pivot table from sales_df summarizing total sales by region and product, which is useful for identifying performance across different segments."
    },
    {
      "command": "sales_df.reset_index(drop=True, inplace=True)",
      "description": "Resets the index of sales_df after filtering or sorting to maintain a clean sequential index."
    },
    {
      "command": "grouped_sales = sales_df.groupby('Region').mean()",
      "description": "Groups sales_df by 'Region' and calculates the average of numeric columns, aiding in regional performance comparison."
    },
    {
      "command": "sales_df['RollingAverage'] = sales_df['SaleTotal'].rolling(window=3).mean()",
      "description": "Calculates a rolling average for 'SaleTotal' over a window of 3 rows, smoothing out short-term fluctuations for trend analysis."
    }
  ],
  "python pypy": [
    {
      "command": "pypy --version",
      "description": "Displays the installed PyPy version. Use this command to verify that PyPy is correctly installed and to check its version for compatibility."
    },
    {
      "command": "pypy /home/username/projects/app.py",
      "description": "Runs the app.py script located in /home/username/projects using the PyPy interpreter. This is useful for executing your project with PyPy's performance benefits."
    },
    {
      "command": "pypy -m timeit 'x = [num**2 for num in range(1000)]'",
      "description": "Measures the execution time of squaring numbers from 0 to 999 with a list comprehension. Ideal for benchmarking code performance in your PyPy environment."
    },
    {
      "command": "pypy -c 'print(2**100)'",
      "description": "Executes a one-liner to print the value of 2 raised to the 100th power. This quick test helps confirm that the PyPy interpreter is running inline commands correctly."
    },
    {
      "command": "pypy -m cProfile /home/username/projects/app.py",
      "description": "Profiles the execution of app.py using PyPy's cProfile module. Use this command to identify performance bottlenecks in your application."
    },
    {
      "command": "pypy -O /home/username/projects/app.py",
      "description": "Runs app.py with optimizations enabled. This command leverages PyPy's optimization flags to potentially improve runtime performance."
    },
    {
      "command": "pypy -m ensurepip",
      "description": "Installs pip for the PyPy environment if it's not already installed. Use this to manage Python packages within PyPy."
    },
    {
      "command": "pypy -m pip install numpy",
      "description": "Installs the numpy library in the PyPy environment. This is essential for numerical computations in projects that run on PyPy."
    },
    {
      "command": "pypy -m pip list",
      "description": "Lists all packages installed in the PyPy environment, which helps in verifying and managing your project dependencies."
    },
    {
      "command": "pypy -m py_compile /home/username/projects/app.py",
      "description": "Compiles app.py into bytecode to ensure it is syntactically correct. Use this command as a quick check before running your script."
    },
    {
      "command": "pypy -m pdb /home/username/projects/app.py",
      "description": "Starts the Python debugger for app.py, allowing you to step through code and diagnose issues interactively using PyPy."
    },
    {
      "command": "pypy -m json.tool /home/username/config/settings.json",
      "description": "Pretty-prints the JSON content of settings.json for easier readability and debugging of configuration files."
    },
    {
      "command": "pypy -X faulthandler=1 /home/username/projects/app.py",
      "description": "Runs app.py with the fault handler enabled to provide detailed stack traces if the script crashes, assisting in debugging segmentation faults or other critical errors."
    },
    {
      "command": "pypy -m unittest discover -s /home/username/tests",
      "description": "Discovers and runs all unittests in the /home/username/tests directory, which helps automate testing for your PyPy projects."
    },
    {
      "command": "pypy -m venv /home/username/venvs/pypy_env",
      "description": "Creates a new virtual environment named pypy_env in /home/username/venvs, isolating project dependencies for a cleaner development setup."
    },
    {
      "command": "pypy /home/username/projects/app.py arg1 arg2",
      "description": "Executes app.py with command-line arguments 'arg1' and 'arg2', allowing you to test scripts that require input parameters."
    },
    {
      "command": "pypy -m pip install -U pip setuptools",
      "description": "Upgrades pip and setuptools to their latest versions in the PyPy environment, ensuring you have access to the newest features and fixes."
    },
    {
      "command": "pypy -m timeit -s 'import math' 'math.sqrt(100)'",
      "description": "Measures the execution time of calculating the square root of 100 after importing the math module. Use this for quick performance checks of math operations in PyPy."
    },
    {
      "command": "pypy -m gc -h",
      "description": "Displays help information for PyPy's garbage collection options, which is useful for fine-tuning memory management in performance-critical applications."
    },
    {
      "command": "pypy -m sysconfig",
      "description": "Prints configuration details of the PyPy environment, providing insights into its setup and compilation parameters."
    }
  ],
      "python_dictionary_list_operations": [
        {
            "command": "my_dict = {'name': 'Alice', 'age': 30}",
            "description": "Creates a dictionary with keys 'name' and 'age'."
        },
        {
            "command": "my_dict['age'] = 31",
            "description": "Updates the value of the 'age' key in the dictionary."
        },
        {
            "command": "my_dict['city'] = 'New York'",
            "description": "Adds a new key-value pair 'city': 'New York' to the dictionary."
        },
        {
            "command": "del my_dict['age']",
            "description": "Deletes the key 'age' and its value from the dictionary."
        },
        {
            "command": "my_dict.keys()",
            "description": "Returns all keys in the dictionary as a view object."
        },
        {
            "command": "my_dict.values()",
            "description": "Returns all values in the dictionary as a view object."
        },
        {
            "command": "my_dict.items()",
            "description": "Returns all key-value pairs in the dictionary as a view object."
        },
        {
            "command": "my_dict.get('name', 'Unknown')",
            "description": "Gets the value of 'name'; returns 'Unknown' if the key does not exist."
        },
        {
            "command": "my_dict.update({'age': 32, 'job': 'Engineer'})",
            "description": "Updates the dictionary with new key-value pairs or modifies existing ones."
        },
        {
            "command": "my_dict.pop('city')",
            "description": "Removes the key 'city' and returns its value."
        },
        {
            "command": "list1 = [1, 2, 3]",
            "description": "Creates a list with elements 1, 2, and 3."
        },
        {
            "command": "list1.append(4)",
            "description": "Adds the element 4 to the end of the list."
        },
        {
            "command": "list1.extend([5, 6])",
            "description": "Extends the list by appending elements from another list."
        },
        {
            "command": "list1.insert(1, 'a')",
            "description": "Inserts the element 'a' at index 1 in the list."
        },
        {
            "command": "list1.pop()",
            "description": "Removes and returns the last element from the list."
        },
        {
            "command": "list1.remove(2)",
            "description": "Removes the first occurrence of the element 2 from the list."
        },
        {
            "command": "list1.index(3)",
            "description": "Returns the index of the first occurrence of the element 3."
        },
        {
            "command": "list1.count(1)",
            "description": "Counts the number of occurrences of the element 1 in the list."
        },
        {
            "command": "list1.reverse()",
            "description": "Reverses the elements of the list in place."
        },
        {
            "command": "list1.sort()",
            "description": "Sorts the elements of the list in ascending order."
        },
        {
            "command": "list1.sort(reverse=True)",
            "description": "Sorts the elements of the list in descending order."
        },
        {
            "command": "list1 = [x * 2 for x in list1]",
            "description": "Doubles each element in the list using a list comprehension."
        },
        {
            "command": "list1 = list(set(list1))",
            "description": "Removes duplicate elements from the list by converting it to a set and back to a list."
        },
        {
            "command": "list1.clear()",
            "description": "Removes all elements from the list."
        },
        {
            "command": "new_dict = {k: v for k, v in my_dict.items() if v != 'New York'}",
            "description": "Creates a new dictionary excluding keys with a specific value."
        },
        {
            "command": "merged_dict = {**dict1, **dict2}",
            "description": "Merges two dictionaries into a single dictionary."
        },
        {
            "command": "squared_dict = {x: x**2 for x in range(5)}",
            "description": "Creates a dictionary with numbers as keys and their squares as values."
        },
        {
            "command": "sorted_dict = dict(sorted(my_dict.items()))",
            "description": "Sorts a dictionary by its keys."
        },
        {
            "command": "inverted_dict = {v: k for k, v in my_dict.items()}",
            "description": "Creates a new dictionary by inverting keys and values."
        }
    ],
    "excel_powerful_functions": [
        {
            "command": "=sum(data_range)",
            "description": "Uses a named range 'data_range' to calculate the sum of all values in the range. Named ranges make formulas more readable and maintainable."
        },
        {
            "command": "=index($a$2:$d$10, 3, 2)",
            "description": "Retrieves the value from the third row and second column within the absolute range $A$2:$D$10."
        },
        {
            "command": "=vlookup(lookup_value, data_table, 2, false)",
            "description": "Searches for 'lookup_value' in the first column of the named range 'data_table' and returns the value in the second column."
        },
        {
            "command": "=xlookup(lookup_value, lookup_array, return_array, \"not found\")",
            "description": "Finds 'lookup_value' in the 'lookup_array' and returns the corresponding value from the 'return_array', with a fallback of 'not found' if no match exists."
        },
        {
            "command": "=filter(data_range, criteria_range > 10)",
            "description": "Filters the values in the named range 'data_range' where the corresponding 'criteria_range' is greater than 10."
        },
        {
            "command": "=unique(filter(data_range, criteria_range=\"active\"))",
            "description": "Returns unique values from 'data_range' where 'criteria_range' equals 'active'."
        },
        {
            "command": "=let(total_sales, sum(sales_range), total_sales / count(sales_range))",
            "description": "Calculates the average sales using the LET function to define 'total_sales' as the sum of 'sales_range'."
        },
        {
            "command": "=lambda(x, y, x*y)(3, 4)",
            "description": "Defines an inline lambda function to multiply two numbers and applies it to 3 and 4."
        },
        {
            "command": "=choose(2, \"apple\", \"banana\", \"cherry\")",
            "description": "Selects the second value ('banana') from the list of options provided."
        },
        {
            "command": "=transpose($a$1:$c$3)",
            "description": "Transforms rows into columns and columns into rows for the range $A$1:$C$3."
        },
        {
            "command": "=text(today(), \"yyyy-mm-dd\")",
            "description": "Formats today's date as 'YYYY-MM-DD'."
        },
        {
            "command": "=networkdays(start_date, end_date, holidays_range)",
            "description": "Calculates the number of working days between 'start_date' and 'end_date', excluding weekends and dates in 'holidays_range'."
        },
        {
            "command": "=indirect(\"sheet1!a1\")",
            "description": "Dynamically references the value in cell A1 on Sheet1 using the INDIRECT function."
        },
        {
            "command": "=offset($a$1, 3, 2, 2, 2)",
            "description": "Returns a 2x2 range starting 3 rows down and 2 columns to the right of cell $A$1."
        },
        {
            "command": "=sumif(sales_range, \">1000\", bonus_range)",
            "description": "Sums the 'bonus_range' where the corresponding value in 'sales_range' is greater than 1000."
        },
        {
            "command": "=countif(status_range, \"approved\")",
            "description": "Counts the number of cells in 'status_range' that contain the value 'approved'."
        },
        {
            "command": "=concat(a1:a10, \"; \")",
            "description": "Concatenates all values in the range A1:A10, separated by a semicolon."
        },
        {
            "command": "=rank.eq(b2, sales_range, 0)",
            "description": "Ranks the value in B2 within 'sales_range', with the highest value ranked as 1."
        },
        {
            "command": "=round(sum(revenue_range), 2)",
            "description": "Calculates the sum of 'revenue_range' and rounds the result to 2 decimal places."
        },
        {
            "command": "=importxml(\"https://example.com\", \"//title\")",
            "description": "Imports the title of the web page at 'https://example.com' using XPath."
        },
        {
            "command": "=importhtml(\"https://example.com\", \"table\", 1)",
            "description": "Imports the first HTML table from the web page at 'https://example.com'."
        },
        {
            "command": "=regexextract(a1, \"\d+\")",
            "description": "Extracts the first sequence of digits from the text in cell A1."
        },
        {
            "command": "=regexreplace(a1, \"old\", \"new\")",
            "description": "Replaces all occurrences of 'old' with 'new' in the text in cell A1."
        },
        {
            "command": "=query(data_range, \"select a, sum(b) where c > 10 group by a order by sum(b) desc\")",
            "description": "Uses the QUERY function to group and sort data from 'data_range' where column C is greater than 10."
        },
        {
            "command": "=filter(a1:a10, len(a1:a10) > 5)",
            "description": "Filters the range A1:A10 to include only values longer than 5 characters."
        },
        {
            "command": "=sequence(5, 2, 10, 3)",
            "description": "Generates a 5x2 array starting at 10 with an increment of 3."
        },
        {
            "command": "=mmult(array1, array2)",
            "description": "Performs matrix multiplication on 'array1' and 'array2'."
        },
        {
            "command": "=transpose(query(data_range, \"select a, b where c > 10\"))",
            "description": "Queries and transposes data from 'data_range' where column C is greater than 10."
        },
        {
            "command": "=sort(a1:a10, 1, true)",
            "description": "Sorts the range A1:A10 in ascending order."
        },
        {
            "command": "=sortn(data_range, 5, 0, b1:b10, false)",
            "description": "Sorts 'data_range' by the values in B1:B10 and returns the top 5 rows."
        },
        {
            "command": "=sumproduct(a1:a10, b1:b10)",
            "description": "Calculates the sum of the products of corresponding values in A1:A10 and B1:B10."
        },
        {
            "command": "=row(a1)",
            "description": "Returns the row number of cell A1."
        },
        {
            "command": "=column(b2)",
            "description": "Returns the column number of cell B2."
        },
        {
            "command": "=sequence(3, 3, 1, 2)",
            "description": "Creates a 3x3 matrix starting at 1 with an increment of 2."
        },
        {
            "command": "=isnumber(search(\"abc\", a1))",
            "description": "Checks if the text 'abc' is found within cell A1 and returns TRUE or FALSE."
        },
        {
            "command": "=filter(a1:c10, b1:b10 > 100, c1:c10 = \"active\")",
            "description": "Filters rows from A1:C10 where column B is greater than 100 and column C is 'active'."
        },
        {
            "command": "=randbetween(1, 100)",
            "description": "Generates a random integer between 1 and 100."
        },
        {
            "command": "=rank(50, a1:a10, 0)",
            "description": "Finds the rank of 50 in the range A1:A10, with 0 indicating descending order."
        },
        {
            "command": "=year(today())",
            "description": "Extracts the current year from today's date."
        },
        {
            "command": "=month(today())",
            "description": "Extracts the current month from today's date."
        },
        {
            "command": "=day(today())",
            "description": "Extracts the current day from today's date."
        },
        {
            "command": "=weekday(today())",
            "description": "Returns the day of the week as a number for today's date."
        },
        {
            "command": "=eomonth(start_date, 1)",
            "description": "Returns the last day of the month one month after 'start_date'."
        },
        {
            "command": "=datedif(start_date, end_date, \"d\")",
            "description": "Calculates the number of days between 'start_date' and 'end_date'."
        },
        {
            "command": "=workday(start_date, 15)",
            "description": "Returns the date that is 15 working days after 'start_date'."
        },
        {
            "command": "=choosecols(data_range, 1, 3)",
            "description": "Selects the first and third columns from 'data_range'."
        },
        {
            "command": "=chooselabels(data_range, \"Region\")",
            "description": "Labels the first column of 'data_range' as 'Region'."
        },
        {
            "command": "=arrayformula(sum(a1:a10 * b1:b10))",
            "description": "Applies an array formula to calculate the sum of products of corresponding values in A1:A10 and B1:B10."
        }
    ],




  // You can add more categories and commands here
};
