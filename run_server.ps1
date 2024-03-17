# Go up one level from the current directory (reservation-system-fe)
cd ..

# Check if the "reservation-system" folder exists
if (-Not (Test-Path .\reservation-system)) {
    Write-Error "Folder '.\reservation-system' not found!"
    Exit 1
}

# Change directory to "reservation-system"
cd .\reservation-system

# Check if the "Scripts" folder exists
if (-Not (Test-Path .\Scripts)) {
    Write-Error "Folder '.\Scripts' not found within 'reservation-system'!"
    Exit 1
}

# Activate the virtual environment within "Scripts"
cd .\Scripts
& .\activate.ps1

# Go back to the parent directory of "Scripts" (reservation-system)
cd ..

#Go back one more level to the root of projects
cd ..

# Check if the "reservation-system-be" folder exists
if (-Not (Test-Path .\reservation-system-be)) {
    Write-Error "Folder '.\reservation-system-be' not found!"
    Exit 1
}

# Change directory to "reservation-system-be"
cd .\reservation-system-be

# Run `python manage.py runserver`
python manage.py runserver 127.0.0.1:8080
