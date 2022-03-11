<?php
include("a.php");
if(isset($_GET['action'])){
	$c = $_GET['action'];
	$d = $_GET['data'];
	if($c == "thread"){
		
	}else if($c == "words"){
		$q = mysqli_query($con, "SELECT * FROM words WHERE word = '$d'");
		if(mysqli_num_rows($q) <= 0){
			$w = mysqli_query($con, "INSERT INTO words (word) VALUES ('$d')");
			if($w){
				echo "Done";
			}else{
				echo mysqli_error($con);
			}
		}
	}else if($c == "bad"){
		$q = mysqli_query($con, "SELECT * FROM words WHERE word = '$d'");
		if(mysqli_num_rows($q) <= 0){
			$w = mysqli_query($con, "INSERT INTO words (word, bad) VALUES ('$d', '1')");
			if($w){
				echo "{";
				echo '"result": "The word "' . $d . '" is now considered as a bad word"';
				echo "}";
			}else{
				echo "{";
				echo '"result": "' . mysqli_error($con) .'"';
				echo "}";
			}
		}else{
			$w = mysqli_query($con, "UPDATE words SET bad = '1' WHERE word = '$d'");
			if($w){
				echo "{";
				echo '"result": "The word "' . $d . '" is now considered as a bad word"';
				echo "}";
			}else{
				echo "{";
				echo '"result": "' . mysqli_error($con) .'"';
				echo "}";
			}
		 }
	}else if($c == "user"){
		
	}
}
?>