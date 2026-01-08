#!/bin/bash

# Script to check which files still have placeholder content

echo "🔍 Checking for files that need your Lovable code..."
echo ""

placeholder_count=0
total_count=0

# Function to check if file contains placeholder comment
check_file() {
    file=$1
    total_count=$((total_count + 1))

    if grep -q "Paste your.*code here" "$file" 2>/dev/null; then
        echo "⏳ Needs code: $file"
        placeholder_count=$((placeholder_count + 1))
    fi
}

# Check all TypeScript/TSX files
while IFS= read -r file; do
    check_file "$file"
done < <(find src -name "*.tsx" -o -name "*.ts")

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Summary:"
echo "   Files checked: $total_count"
echo "   Files needing code: $placeholder_count"
echo "   Files completed: $((total_count - placeholder_count))"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $placeholder_count -eq 0 ]; then
    echo "✅ All files have been updated! Ready to run: npm run dev"
else
    echo "📝 $placeholder_count files still need your Lovable code"
    echo "   See FILE_MAPPING.md for the complete checklist"
fi
