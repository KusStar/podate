use inquire::{InquireError, Select, Text};
use std::process::Command;

fn main() {
    Command::new("podman")
    .arg("container")
    .arg("ls")
    .arg("--format json")
        .spawn()
        .expect("podman container ls failed to run");

    let options: Vec<&str> = vec![
        "Banana",
        "Apple",
        "Strawberry",
        "Grapes",
        "Lemon",
        "Tangerine",
        "Watermelon",
        "Orange",
        "Pear",
        "Avocado",
        "Pineapple",
    ];

    let ans: Result<&str, InquireError> =
        Select::new("What's your favorite fruit?", options).prompt();

    match ans {
        Ok(choice) => println!("{}! That's mine too!", choice),
        Err(_) => println!("There was an error, please try again"),
    }
}
