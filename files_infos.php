<?php

foreach ($_FILES['dragged_files'] as $key => $values) {
	echo "$key: $values\n";
}