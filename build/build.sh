#!/bin/sh

echo "#!/usr/bin/env node" >> bin/show-open-food-trucks
cat bin/index.js >> bin/show-open-food-trucks
chmod 755 bin/show-open-food-trucks