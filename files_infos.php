<?php

$files = isset($_FILES['dragged_files']) ? $_FILES['dragged_files'] : $_FILES['selected_files'];

echo '<ul>';
foreach ($files as $key => $values) {
	echo "<li>$key: $values</li>";
}
echo '</ul>';
echo '<input type="button" class="submit-button" value="Wanna send another file?" onclick="initView();">';